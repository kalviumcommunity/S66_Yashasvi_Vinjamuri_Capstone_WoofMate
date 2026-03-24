const Question = require("../models/question.model");

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(`Fetched ${questions.length} questions successfully`);
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error in getQuestions controller:", error);
        res.status(500).json({ error: "Failed to fetch questions. Please check server logs.", details: error.message });
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
