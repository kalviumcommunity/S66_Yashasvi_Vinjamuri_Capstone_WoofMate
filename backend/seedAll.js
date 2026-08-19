const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user.model");
const { DogModel } = require("./models/animal.model");
const AdoptionRequest = require("./models/adoption.model");
const Rescue = require("./models/rescue.model");
const ServiceBooking = require("./models/serviceBooking.model");
const Contact = require("./models/contact.model");
const Donation = require("./models/donation.model");
const Chat = require("./models/chat");
const AIConversation = require("./models/aiConversation.model");
const QuizAttempt = require("./models/quizAttempt.model");
const Feature = require("./models/feature.model");
const Testimonial = require("./models/testimonial.model");
const Guide = require("./models/guide.model");
const Question = require("./models/question.model");
const Carousel = require("./models/carousel.model");

const mongoUrl = process.env.MONGOURL || process.env.MONGODB_URI;

if (!mongoUrl) {
  throw new Error("Missing MongoDB connection string. Set MONGOURL or MONGODB_URI.");
}

const users = [
  {
    name: "WoofMate Admin",
    email: "admin@woofmate.test",
    password: "Admin123!",
    role: "admin",
  },
  {
    name: "Aarav Adopter",
    email: "aarav@woofmate.test",
    password: "Adopter123!",
    role: "adopter",
  },
  {
    name: "Maya Shelter",
    email: "maya@woofmate.test",
    password: "Shelter123!",
    role: "shelter",
  },
  {
    name: "Riya Rescue",
    email: "riya@woofmate.test",
    password: "Rescue123!",
    role: "rescue",
  },
];

const dogs = [
  {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    gender: "male",
    size: "large",
    qualities: "Friendly, intelligent, energetic",
    location: "Bangalore",
    description: "Buddy is social, confident, and happiest when he has room to play fetch.",
    history: "Rescued after being found near a school campus and quickly won over every volunteer.",
    specificNeeds: "Needs daily exercise and regular grooming.",
    images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop"],
  },
  {
    name: "Luna",
    breed: "Beagle",
    age: 3,
    gender: "female",
    size: "medium",
    qualities: "Curious, merry, affectionate",
    location: "Pune",
    description: "Luna is food-motivated, cuddly indoors, and endlessly curious on walks.",
    history: "Surrendered by a family that relocated abroad.",
    specificNeeds: "Needs a secure leash routine because she follows scents fast.",
    images: ["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop"],
  },
  {
    name: "Daisy",
    breed: "Pug",
    age: 1,
    gender: "female",
    size: "small",
    qualities: "Playful, loving, goofy",
    location: "Delhi",
    description: "Daisy loves people, prefers short play sessions, and settles quickly indoors.",
    history: "Born in foster care after her mother was rescued.",
    specificNeeds: "Needs a cool environment and shorter walks during heat.",
    images: ["https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop"],
  },
  {
    name: "Max",
    breed: "German Shepherd",
    age: 4,
    gender: "male",
    size: "large",
    qualities: "Loyal, confident, trainable",
    location: "Mumbai",
    description: "Max is focused, calm with structure, and ideal for an experienced adopter.",
    history: "Retired from advanced obedience training due to a program closure.",
    specificNeeds: "Needs mental stimulation and structured exercise.",
    images: ["https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=800&auto=format&fit=crop"],
  },
  {
    name: "Chloe",
    breed: "Indie Mix",
    age: 2,
    gender: "female",
    size: "medium",
    qualities: "Alert, adaptable, gentle",
    location: "Hyderabad",
    description: "Chloe is an indie rescue with a calm temperament and strong bond with trusted people.",
    history: "Rescued from a roadside litter and socialized in foster care.",
    specificNeeds: "Needs patient introductions to new environments.",
    images: ["https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=800&auto=format&fit=crop"],
  },
  {
    name: "Rocky",
    breed: "Labrador Retriever",
    age: 5,
    gender: "male",
    size: "large",
    qualities: "Outgoing, active, food-loving",
    location: "Chennai",
    description: "Rocky is a classic family lab who thrives on attention and routine.",
    history: "Owner could no longer manage his care after a medical emergency.",
    specificNeeds: "Needs weight management and consistent portion control.",
    images: ["https://images.unsplash.com/photo-1554692911-39a733ecab0d?q=80&w=800&auto=format&fit=crop"],
  },
];

const features = [
  {
    title: "Adoptable Dogs",
    description: "Browse detailed dog profiles with breed, size, temperament, and care notes before applying.",
  },
  {
    title: "AI Dog Matching",
    description: "Take the WoofMate quiz to get dog recommendations aligned to your home, routine, and preferences.",
  },
  {
    title: "Rescue Reporting",
    description: "Report strays or urgent welfare cases so nearby responders can take action quickly.",
  },
  {
    title: "Pet Care Services",
    description: "Book grooming, training, and wellness visits directly through the platform.",
  },
];

const testimonials = [
  {
    name: "Nisha Rao",
    position: "Adopter",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-1.png",
    review: "WoofMate made the adoption process feel clear and human. We found a perfect match in less than a week.",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    position: "Volunteer",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    review: "The rescue dashboard helps us keep track of open cases and follow-ups without chasing updates manually.",
    rating: 4,
  },
  {
    name: "Aditi Sharma",
    position: "First-time Pet Parent",
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female-2.png",
    review: "The AI recommendations and starter guides gave me confidence before bringing my dog home.",
    rating: 5,
  },
];

const guides = [
  {
    title: "How To Prepare Your Home For A Rescue Dog",
    content: "Set up a quiet decompression space, keep early routines predictable, and avoid overwhelming your dog with too many visitors in the first week.",
    category: "Lifestyle",
  },
  {
    title: "Healthy Feeding Basics For Active Dogs",
    content: "Choose balanced food, keep portion sizes consistent, and monitor body condition instead of relying only on the feeding chart.",
    category: "Food",
  },
  {
    title: "Beginner Obedience That Actually Sticks",
    content: "Use short training sessions, reward desired behavior immediately, and practice in low-distraction environments before leveling up.",
    category: "Training",
  },
  {
    title: "Signs Your Dog Needs A Vet Visit",
    content: "Persistent vomiting, appetite loss, difficulty breathing, and sudden behavior changes are all good reasons to contact a vet quickly.",
    category: "Health",
  },
];

const questions = [
  { question: "What type of home do you live in?", key: "homeType", options: ["Apartment", "House with yard", "Farm"] },
  { question: "Do you have children?", key: "hasChildren", options: ["Babies/Toddlers", "School-age kids", "Teens", "No children"] },
  { question: "Do you have other pets?", key: "hasOtherPets", options: ["Dogs", "Cats", "Small animals", "No other pets"] },
  { question: "How active is your lifestyle?", key: "activityLevel", options: ["Couch potato", "Occasional walks", "Daily exercise", "High-intensity adventures"] },
  { question: "What size of dog do you prefer?", key: "preferredSize", options: ["Small", "Medium", "Large"] },
  { question: "How much grooming can you manage?", key: "groomingTime", options: ["Minimal", "Weekly brushing", "Professional grooming is fine"] },
];

const carousel = [
  { imageUrl: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { imageUrl: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { imageUrl: "https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { imageUrl: "https://images.pexels.com/photos/3361746/pexels-photo-3361746.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

async function seed() {
  await mongoose.connect(mongoUrl);

  try {
    await Promise.all([
      AdoptionRequest.deleteMany({}),
      Rescue.deleteMany({}),
      ServiceBooking.deleteMany({}),
      Contact.deleteMany({}),
      Donation.deleteMany({}),
      Chat.deleteMany({}),
      AIConversation.deleteMany({}),
      QuizAttempt.deleteMany({}),
      Feature.deleteMany({}),
      Testimonial.deleteMany({}),
      Guide.deleteMany({}),
      Question.deleteMany({}),
      Carousel.deleteMany({}),
      DogModel.deleteMany({}),
      User.deleteMany({}),
    ]);

    const createdUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      createdUsers.push({
        ...(await User.create({
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        })).toObject(),
        plainPassword: user.password,
      });
    }

    const userByEmail = Object.fromEntries(createdUsers.map((user) => [user.email, user]));
    const createdDogs = await DogModel.insertMany(dogs);

    await Promise.all([
      Feature.insertMany(features),
      Testimonial.insertMany(testimonials),
      Guide.insertMany(guides),
      Question.insertMany(questions),
      Carousel.insertMany(carousel),
    ]);

    const [buddy, luna, daisy] = createdDogs;
    const admin = userByEmail["admin@woofmate.test"];
    const adopter = userByEmail["aarav@woofmate.test"];
    const shelter = userByEmail["maya@woofmate.test"];
    const rescueLead = userByEmail["riya@woofmate.test"];

    await AdoptionRequest.insertMany([
      { user: adopter._id, dog: buddy._id, status: "pending" },
      { user: adopter._id, dog: luna._id, status: "approved" },
    ]);

    await Rescue.insertMany([
      {
        reporter: adopter._id,
        location: "Koramangala 4th Block, Bangalore",
        description: "Friendly stray with a limping front paw seen near the bus stop and local bakery.",
        dogImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
        status: "responding",
      },
      {
        reporter: rescueLead._id,
        location: "Ameerpet Metro Exit, Hyderabad",
        description: "Young indie dog found sheltering under parked vehicles during heavy rain.",
        dogImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
        status: "pending",
      },
    ]);

    await ServiceBooking.insertMany([
      {
        service: "Grooming",
        contact: "9876543210",
        date: "2026-05-25",
        time: "10:30",
        user: adopter._id,
        status: "pending",
      },
      {
        service: "Vet Consultation",
        contact: "9123456789",
        date: "2026-05-27",
        time: "16:00",
        user: shelter._id,
        status: "ongoing",
      },
    ]);

    await Contact.insertMany([
      {
        name: "Rohan Patel",
        email: "rohan@example.com",
        subject: "Partnership inquiry",
        message: "We run a local foster network and would like to explore listing our dogs on WoofMate.",
      },
      {
        name: "Sneha Iyer",
        email: "sneha@example.com",
        subject: "Volunteer support",
        message: "I want to help with weekend transport and temporary fostering for rescue cases.",
      },
    ]);

    await Donation.insertMany([
      {
        user: adopter._id,
        amount: 1500,
        currency: "INR",
        status: "completed",
        paypalOrderId: "WOOFMATE-ORDER-001",
        paypalTransactionId: "WOOFMATE-TXN-001",
      },
      {
        user: admin._id,
        amount: 2500,
        currency: "INR",
        status: "completed",
        paypalOrderId: "WOOFMATE-ORDER-002",
        paypalTransactionId: "WOOFMATE-TXN-002",
      },
    ]);

    await Chat.insertMany([
      {
        participants: [adopter._id, admin._id],
        messages: [
          {
            senderId: adopter._id,
            text: "Hi, I wanted to check whether Buddy is still available for adoption.",
          },
          {
            senderId: admin._id,
            text: "Yes, Buddy is available. Your application looks good so far and we can schedule a meet-up.",
          },
        ],
      },
      {
        participants: [shelter._id, admin._id],
        messages: [
          {
            senderId: shelter._id,
            text: "We have updated the latest foster notes for Luna.",
          },
        ],
      },
    ]);

    await AIConversation.insertMany([
      {
        user: adopter._id,
        role: "user",
        content: "What should I buy before bringing home a rescue dog?",
      },
      {
        user: adopter._id,
        role: "assistant",
        content: "Start with a crate or safe bed, food and water bowls, leash, collar, treats, and a quiet decompression space.",
      },
    ]);

    await QuizAttempt.insertMany([
      {
        user: adopter._id,
        answers: {
          homeType: "House with yard",
          hasChildren: "No children",
          hasOtherPets: "No other pets",
          activityLevel: "Daily exercise",
          preferredSize: "Medium",
        },
        recommendedDogs: [buddy._id, luna._id, daisy._id],
        summary: "You would do well with a social dog that enjoys regular exercise and adapts well to home routines.",
      },
    ]);

    console.log("Sample data seeded successfully.");
    console.log("Test login credentials:");
    createdUsers.forEach((user) => {
      console.log(`- ${user.role}: ${user.email} / ${user.plainPassword}`);
    });
  } finally {
    await mongoose.connection.close();
  }
}

seed().catch((error) => {
  console.error("Sample data seed failed:", error);
  process.exit(1);
});
