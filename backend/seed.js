const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Feature = require("./models/feature.model");
const Testimonial = require("./models/testimonial.model");
const Question = require("./models/question.model");
const Carousel = require("./models/carousel.model");

const features = [
    { title: "Dogs ready for Adoption", description: "Explore our wide selection of dogs ready for adoption. Each dog has a unique personality and story, waiting to find their forever home." },
    { title: "Dog Rescue Services", description: "We offer dog rescue services to help dogs in need. Our dedicated team works tirelessly to provide a safe haven for dogs and find them loving homes." },
    { title: "Dog Donation", description: "Support our cause by making a donation. Your contribution will go towards the well-being and care of dogs in our shelter." },
    { title: "Chat Application", description: "Stay connected with the owners of the dogs through our chat application. Ask questions, get to know the dogs better, and arrange meet-ups." },
    { title: "Dog Services", description: "We offer a range of services to keep your dog healthy and happy. From grooming and veterinary care to dog walking, we've got all your dog's needs covered." },
    { title: "AI-Powered Dog Matching System", description: "Our personalized quiz uses AI technology to match adopters with the perfect dog. Answer a few questions about your lifestyle and preferences, and we'll find the best furry friend for you." },
];

const testimonials = [
    { name: "abc", avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png", review: "lorem ipsum ", rating: 4 },
    { name: "John Doe", position: "Frontend Developer", avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png", review: "“I am amazed by the speed and ease of use. This platform has helped me improve my productivity by a significant amount.”", rating: 4 },
    { name: "Jane Smith", position: "UI/UX Designer", avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-1.png", review: "“The interface is so intuitive, and the support team was very helpful in answering all my questions. Highly recommend!”", rating: 5 },
];

const quizQuestions = [
    { question: "What type of home do you live in?", name: "homeType", options: ["apartment", "house with yard", "farm"] },
    { question: "Do you have a fenced yard?", name: "fencedYard", options: ["yes", "no"] },
    { question: "How many people are in your household?", name: "householdSize", options: ["1", "2", "3-5", "6+"] },
    { question: "Do you have children?", name: "children", options: ["yes", "no"] },
    { question: "Do you have other pets?", name: "otherPets", options: ["yes", "no"] },
    { question: "How many hours a day can you spend with your dog?", name: "timeWithDog", options: ["less than 2 hours", "2-4 hours", "4-6 hours", "more than 6 hours"] },
    { question: "How active are you?", name: "activityLevel", options: ["not very active", "moderately active", "very active"] },
    { question: "How long will your dog be alone each day?", name: "aloneTime", options: ["less than 2 hours", "2-4 hours", "5-8 hours", "more than 8 hours"] },
    { question: "Have you owned a dog before?", name: "experience", options: ["yes", "no"] },
    { question: "Are you willing to train your dog?", name: "training", options: ["yes", "no"] },
    { question: "What size of dog do you prefer?", name: "size", options: ["small", "medium", "large"] },
    { question: "What qualities are important to you in a dog?", name: "traits", options: ["playful and energetic", "calm and laid-back", "good with children", "good with other animals", "low exercise needs"] },
    { question: "Do you or anyone in your household have dog allergies?", name: "allergies", options: ["yes", "no"] },
    { question: "Are you looking for a dog suitable for a senior?", name: "senior", options: ["yes", "no"] },
    { question: "How much grooming are you comfortable with?", name: "grooming", options: ["low", "medium", "high"] }
];

const images = [
    'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2607541/pexels-photo-2607541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3361746/pexels-photo-3361746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/981062/pexels-photo-981062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1612861/pexels-photo-1612861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3361692/pexels-photo-3361692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1009922/pexels-photo-1009922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/776373/pexels-photo-776373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7324407/pexels-photo-7324407.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/732456/pexels-photo-732456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3361722/pexels-photo-3361722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/97863/pexels-photo-97863.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2248516/pexels-photo-2248516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1378849/pexels-photo-1378849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1696584/pexels-photo-1696584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

const formattedPhotos = images.map(img => ({ imageUrl: img }));

mongoose.connect(process.env.MONGOURL)
    .then(async () => {
        console.log("Connected to MongoDB");

        await Feature.deleteMany();
        await Feature.insertMany(features);
        console.log("Features seeded successfully.");

        await Testimonial.deleteMany();
        await Testimonial.insertMany(testimonials);
        console.log("Testimonials seeded successfully.");

        await Question.deleteMany();
        await Question.insertMany(quizQuestions);
        console.log("Questions seeded successfully.");

        await Carousel.deleteMany();
        await Carousel.insertMany(formattedPhotos);
        console.log("Carousel seeded successfully.");

        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
