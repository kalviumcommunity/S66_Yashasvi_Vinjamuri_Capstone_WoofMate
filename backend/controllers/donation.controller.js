const Donation = require("../models/donation.model");

const recordSuccess = async (req, res) => {
  try {
    const { amount, paypalOrderId, paypalTransactionId, status } = req.body;

    const newDonation = new Donation({
      user: req.user ? req.user.id : null,
      amount,
      currency: "USD",
      status: status || "completed",
      paypalOrderId,
      paypalTransactionId,
    });

    await newDonation.save();

    res.status(201).json({ message: "Donation recorded successfully!", donation: newDonation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate("user", "name email");
        res.status(200).json({ message: "Donations fetched", donations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recordSuccess, getDonations };
