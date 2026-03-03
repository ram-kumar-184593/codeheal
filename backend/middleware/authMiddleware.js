const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No token → block access
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid token user",
      });
    }

    // Attach full user object
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);

    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};
