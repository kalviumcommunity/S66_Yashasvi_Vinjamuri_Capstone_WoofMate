const express = require("express");
const router = express.Router();
const { createBooking, getBookings, getAllBookings } = require("../controllers/serviceBooking.controller");
const authenticate = require("../middleware/authenticate");
const setUser = require("../middleware/setUser");
const ServiceBooking = require("../models/serviceBooking.model");

// Public route for booking (with optional user identification)
router.post("/", setUser, createBooking);

// Protected route to get user's bookings
router.get("/my-bookings", authenticate, getBookings);

// Admin route to get all bookings
router.get("/all", authenticate, getAllBookings);

// Admin route to update booking status
router.put("/:id/status", authenticate, async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin route to delete a booking
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await ServiceBooking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
