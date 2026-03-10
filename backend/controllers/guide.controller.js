const GuideModel = require('../models/guide.model');

const getAllGuides = async (req, res) => {
    try {
        const guides = await GuideModel.find();
        res.status(200).json({ message: "Guides fetched successfully", guides });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGuidesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const guides = await GuideModel.find({ category: new RegExp('^' + category + '$', 'i') });
        res.status(200).json({ message: "Guides fetched successfully by category", guides });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createGuide = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const newGuide = new GuideModel({ title, content, category });
        await newGuide.save();
        res.status(201).json({ message: "Guide created successfully", guide: newGuide });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedGuides = async (req, res) => {
    try {
        const mockGuides = req.body;
        await GuideModel.deleteMany();
        const guides = await GuideModel.insertMany(mockGuides);
        res.status(201).json({ message: "Guides seeded successfully", guides });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllGuides, getGuidesByCategory, createGuide, seedGuides };
