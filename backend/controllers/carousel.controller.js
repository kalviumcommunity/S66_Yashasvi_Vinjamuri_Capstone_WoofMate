const Carousel = require("../models/carousel.model");

const getCarouselPhotos = async (req, res) => {
    try {
        const photos = await Carousel.find();
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedCarouselPhotos = async (req, res) => {
    const mockPhotos = req.body;
    // If array of strings is passed, format to objects
    const formattedPhotos = Array.isArray(mockPhotos) ? mockPhotos.map(photo => {
        if (typeof photo === 'string') {
            return { imageUrl: photo };
        }
        return photo;
    }) : [];

    try {
        await Carousel.deleteMany();
        const photos = await Carousel.insertMany(formattedPhotos);
        res.status(201).json({ message: "Carousel photos seeded successfully", photos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCarouselPhotos, seedCarouselPhotos };
