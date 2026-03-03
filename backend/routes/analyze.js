const express = require("express");
const router = express.Router();
const analyzeController = require("../controllers/analyzeController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/analyze
router.post("/", authMiddleware, analyzeController.handleAnalysis);

const Analysis = require("../models/Analysis");

router.get("/", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.json({ success: true, data: [] });
  }

  const history = await Analysis.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: history });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Analysis.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!deleted) {
        return res.status(404).json({
        success: false,
        error: "Analysis not found for this user"
      });
    }

    

    res.json({
      success: true,
      message: "Analysis deleted"
    });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete analysis"
    });
  }
});


module.exports = router;
