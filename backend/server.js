const rateLimit = require("express-rate-limit");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const analyzeRoutes = require("./routes/analyze");

const app = express();

// PORT (Render requires this)

const PORT = process.env.PORT || 5000;

// CORS CONFIG (production safe)

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);

// MIDDLEWARE

app.use(express.json());

// RATE LIMITER

const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    error: "Too many analysis requests. Please try again later.",
  },
});

// DATABASE CONNECTION

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ROUTES

app.get("/", (req, res) => {
  res.send("CodeHeal API running 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/analyze", analyzeLimiter, analyzeRoutes);

// START SERVER

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
