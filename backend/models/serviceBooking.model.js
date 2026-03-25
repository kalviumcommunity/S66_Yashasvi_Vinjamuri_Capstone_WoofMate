const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please fill a valid contact number (10 digits)"],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Optional for guest bookings if needed, but the user requested "under the user that filled the form"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);
