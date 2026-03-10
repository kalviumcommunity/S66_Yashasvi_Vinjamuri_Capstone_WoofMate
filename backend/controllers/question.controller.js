const Question = require("../models/question.model");

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seedQuestions = async (req, res) => {
    const mockQuestions = req.body;
    try {
        await Question.deleteMany();
        const questions = await Question.insertMany(mockQuestions);
        res.status(201).json({ message: "Questions seeded successfully", questions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getQuestions, seedQuestions };
