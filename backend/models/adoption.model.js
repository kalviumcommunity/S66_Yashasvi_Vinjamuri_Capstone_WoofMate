const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    dog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dogs",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("AdoptionRequest", adoptionSchema);
