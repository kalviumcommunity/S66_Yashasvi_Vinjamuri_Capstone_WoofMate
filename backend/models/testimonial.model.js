const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
