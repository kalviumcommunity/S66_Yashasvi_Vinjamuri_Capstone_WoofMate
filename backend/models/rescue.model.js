
const mongoose = require("mongoose");

const rescueSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dogImage: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ["pending", "responding", "resolved"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("rescue", rescueSchema);
