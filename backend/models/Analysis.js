const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  inputText: {
    type: String,
    required: true,
  },

  detectedLanguage: {
    type: String,
  },

  correctedCode: {
    type: String,
  },

  shortExplanation: {
    type: String,
  },

  mode: {
    type: String,
  },

  result: {
    type: Object,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
