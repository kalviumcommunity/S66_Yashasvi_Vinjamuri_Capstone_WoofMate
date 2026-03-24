const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DogModel } = require("./models/animal.model");

const mockDogs = [
  {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    gender: "male",
    size: "large",
    qualities: "Friendly, Intelligent, Energetic",
    location: "Mumbai",
    description: "Buddy is a happy-go-lucky Golden Retriever who loves attention.",
    history: "Rescued from a busy street.",
    specificNeeds: "Needs regular exercise and grooming.",
    images: ["https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
  },
  {
    name: "Luna",
    breed: "Beagle",
    age: 3,
    gender: "female",
    size: "medium",
    qualities: "Curious, Merry, Friendly",
    location: "Pune",
    description: "Luna is a sweet Beagle with a great nose for snacks.",
    history: "Surrendered by previous owner who moved.",
    specificNeeds: "Needs a secure backyard as she loves to follow scents.",
    images: ["https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
  },
  {
    name: "Daisy",
    breed: "Pug",
    age: 1,
    gender: "female",
    size: "small",
    qualities: "Charming, Mischievous, Loving",
    location: "Delhi",
    description: "Daisy is a small dog with a big personality.",
    history: "Born in a rescue foster home.",
    specificNeeds: "Needs a cool environment as she can't handle heat.",
    images: ["https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
  }
];

mongoose.connect(process.env.MONGOURL)
  .then(async () => {
    console.log("Connected to MongoDB");
    await DogModel.deleteMany();
    await DogModel.insertMany(mockDogs);
    console.log("Dogs seeded successfully.");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
