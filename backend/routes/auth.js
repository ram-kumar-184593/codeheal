const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ success: true, message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // ❗ Prevent Google users from using password login
    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        error: "Use Google login for this account",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

// GOOGLE LOGIN
router.post("/google", async (req, res) => {
  
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        error: "No credential provided",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        avatar,
        provider: "google",
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: "Google login failed",
    });
  }
});

const authMiddleware = require("../middleware/authMiddleware");

// TEST PROTECTED ROUTE
router.get("/me", authMiddleware, (req, res) => {

  res.json({
    success: true,
    message: "Protected route working",
    user: req.user
  });

});

module.exports = router;
