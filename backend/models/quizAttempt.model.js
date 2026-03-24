const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    answers: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    recommendedDogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dogs"
    }],
    summary: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
