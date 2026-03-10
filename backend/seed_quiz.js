const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Question = require("./models/question.model");
const connection = require("./db/database");

const quizQuestions = [
    {
        question: "What is your living situation?",
        key: "living_situation",
        options: ["Apartment", "House with yard", "Farm/Large estate", "Suburban home"]
    },
    {
        question: "How active is your lifestyle?",
        key: "activity_level",
        options: ["Couch potato (Minimal exercise)", "Moderate (Daily walks)", "High (Running/Hiking)", "Very High (Working/Sporting)"]
    },
    {
        question: "How much time can you dedicate to grooming?",
        key: "grooming_commitment",
        options: ["Low (Once a month)", "Moderate (Once a week)", "High (Daily brushing/Pro grooming)"]
    },
    {
        question: "How do you feel about shedding?",
        key: "shedding_preference",
        options: ["Can't stand it (Need hypoallergenic)", "Don't mind a little", "Doesn't matter at all"]
    },
    {
        question: "What is your experience level with dogs?",
        key: "experience_level",
        options: ["First-time owner", "Had dogs before", "Experienced trainer/Owner"]
    },
    {
        question: "How much time will the dog spend alone daily?",
        key: "alone_time",
        options: ["0-2 hours", "2-6 hours", "6+ hours"]
    },
    {
        question: "Do you have children at home?",
        key: "has_kids",
        options: ["Yes", "No"]
    },
    {
        question: "Do you have other pets?",
        key: "has_other_pets",
        options: ["Yes - dogs", "Yes - cats/small animals", "No"]
    },
    {
        question: "What is your budget for monthly pet care?",
        key: "budget",
        options: ["Low ($50-100)", "Medium ($100-250)", "High ($250+)"]
    },
    {
        question: "What size of dog are you looking for?",
        key: "size_preference",
        options: ["Small (Under 20 lbs)", "Medium (20-50 lbs)", "Large (50+ lbs)", "No preference"]
    }
];

const seedQuiz = async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        await Question.deleteMany();
        await Question.insertMany(quizQuestions);
        console.log("Quiz questions seeded successfully with proper keys");
        process.exit();
    } catch (err) {
        console.error("Error seeding quiz questions:", err);
        process.exit(1);
    }
};

seedQuiz();
