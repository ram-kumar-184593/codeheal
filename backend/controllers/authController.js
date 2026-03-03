const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// ============================
// GENERATE JWT
// ============================

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ============================
// SIGN UP (EMAIL/PASSWORD)
// ============================

exports.signUp = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local"
    });

    const token = generateToken(user._id);

    res.json({
      token,
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};


// ============================
// SIGN IN (EMAIL/PASSWORD)
// ============================

exports.signIn = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        error: "Use Google login"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};



// ============================
// GOOGLE LOGIN
// ============================

exports.googleAuth = async (req, res) => {

  try {

    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;

    let user = await User.findOne({ email });

    if (!user) {

      user = await User.create({
        name,
        email,
        avatar,
        provider: "google"
      });

    }

    const token = generateToken(user._id);

    res.json({
      token,
      user
    });

  } catch (err) {

    res.status(500).json({
      error: "Google authentication failed"
    });

  }

};