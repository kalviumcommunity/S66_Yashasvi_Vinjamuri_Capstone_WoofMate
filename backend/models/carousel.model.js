const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Carousel", carouselSchema);
