const Feature = require("../models/feature.model");

const getFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedFeatures = async (req, res) => {
    const mockFeatures = req.body;
    try {
        await Feature.deleteMany();
        const features = await Feature.insertMany(mockFeatures);
        res.status(201).json({ message: "Features seeded successfully", features });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getFeatures, seedFeatures };
