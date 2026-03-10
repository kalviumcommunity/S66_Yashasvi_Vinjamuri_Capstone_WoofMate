const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["adopter", "shelter", "admin", "user", "rescue"],
    default: "adopter",
  },
});

module.exports = mongoose.model("user", userSchema);
