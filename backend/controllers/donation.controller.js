const DonationModel = require('../models/donation.model');

// Using placeholder logic for Stripe integration
const createCheckoutSession = async (req, res) => {
    try {
        const { amount, currency = "usd", userId } = req.body;

        // Placeholder: In a real app, you would initialize Stripe and call stripe.checkout.sessions.create
        const mockSessionId = "cs_test_" + Math.random().toString(36).substring(7);
        const mockPaymentIntentId = "pi_test_" + Math.random().toString(36).substring(7);

        const newDonation = new DonationModel({
            user: userId || null,
            amount,
            currency,
            status: "pending",
            paymentIntentId: mockPaymentIntentId
        });

        await newDonation.save();

        res.status(200).json({
            message: "Checkout session created",
            sessionId: mockSessionId,
            donation: newDonation
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { donationId, status } = req.body;

        const updatedDonation = await DonationModel.findByIdAndUpdate(
            donationId,
            { status: status },
            { new: true }
        );

        if (!updatedDonation) return res.status(404).json({ error: "Donation not found" });

        res.status(200).json({ message: "Payment status updated", donation: updatedDonation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDonations = async (req, res) => {
    try {
        const donations = await DonationModel.find().populate("user", "name email");
        res.status(200).json({ message: "Donations fetched", donations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedDonations = async (req, res) => {
    try {
        const mockDonations = req.body;
        await DonationModel.deleteMany();
        const donations = await DonationModel.insertMany(mockDonations);
        res.status(201).json({ message: "Donations seeded successfully", donations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createCheckoutSession, verifyPayment, getDonations, seedDonations };
