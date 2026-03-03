const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    }
  },

  // NEW — Google profile image
  avatar: {
    type: String,
    default: null
  },

  // NEW — login provider
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", UserSchema);