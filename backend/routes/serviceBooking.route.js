const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/serviceBooking.controller");
const authenticate = require("../middleware/authenticate");
const setUser = require("../middleware/setUser");

// Public route for booking (with optional user identification)
router.post("/", setUser, createBooking);

// Protected route to get user's bookings
router.get("/my-bookings", authenticate, getBookings);

module.exports = router;
