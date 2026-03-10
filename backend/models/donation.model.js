const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false, // Optional, can be guest donation
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "usd",
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentIntentId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("donation", donationSchema);
