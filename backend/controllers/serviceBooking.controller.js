const ServiceBooking = require("../models/serviceBooking.model");

const createBooking = async (req, res) => {
  try {
    const { service, contact, date, time } = req.body;
    
    const newBooking = new ServiceBooking({
      service,
      contact,
      date,
      time,
      user: req.user ? req.user.id : null, // Support both logged in and guest (if applicable)
    });

    await newBooking.save();
    res.status(201).json({ message: "Service booked successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await ServiceBooking.find({ user: userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find({}).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBooking, getBookings, getAllBookings };
