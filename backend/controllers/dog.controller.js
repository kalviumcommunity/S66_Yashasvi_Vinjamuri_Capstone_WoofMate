const { DogModel } = require('../models/animal.model')
const cloudinary = require('../config/cloudinary')
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getDogs = async (req, res) => {
  try {
    const dogs = await DogModel.find().populate('user', "name email role")
    res.status(200).json({ "message": "Dogs fetched successfully", dogs })
  } catch (error) {
    res.status(400).json({ "error": "Could not fetch dogs" })
  }
}

const getDogsbyId = async (req, res) => {
  const { id } = req.params
  try {
    const dog = await DogModel.findById(id)
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" })
    }
    res.status(200).json({ "message": "Dog fetched successfully", dog })
  } catch (error) {
    res.status(400).json({ "error": "Could not fetch dogs" })
  }
}

const postDog = async (req, res) => {
  try {
    const { images, name, breed, age, gender, size, qualities, location, description, history, specialNeeds, user } = req.body;
    const uploadedImages = []
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "dog_images",
      });
      uploadedImages.push(result.secure_url)
    }
    const new_dog = new DogModel({ images: uploadedImages, name, breed, age, gender, size, qualities, location, description, history, specialNeeds, user })
    await new_dog.save()
    res.status(201).json({ message: "Dog added successfully", dog: new_dog })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDog = async (req, res) => {
  const { id } = req.params
  const { images, name, breed, age, gender, size, qualities, location, description, history, specialNeeds } = req.body
  try {
    let uploadedImages = []
    if (images && images.length > 0) {
      for (let image of images) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "dog_images"
        });
        uploadedImages.push(result.secure_url)
      }
    }
    const updatedDog = await DogModel.findByIdAndUpdate(id, { ...(images && { images: uploadedImages }), name, breed, age, gender, size, qualities, location, description, history, specialNeeds }, { new: true })
    if (!updatedDog) {
      return res.status(404).json({ error: "Dog not found" })
    }
    res.status(200).json({ message: "Dog updated successfully", dog: updatedDog })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const matchDogQuiz = async (req, res) => {
  try {
    const { sizePreference, energyLevel, hasKids, hasOtherPets } = req.body;
    let query = {};

    if (sizePreference) {
      query.size = sizePreference.toLowerCase();
    }

    const dogs = await DogModel.find(query);
    const topMatches = dogs.slice(0, 3);

    res.status(200).json({ message: "Quiz processed successfully", matches: topMatches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const matchDogWithAI = async (req, res) => {
  try {
    const answers = req.body;
    const dogs = await DogModel.find();

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Fallback to basic matching if no API key
      const basicMatches = dogs.slice(0, 3);
      return res.status(200).json({
        message: "Basic matching used (OpenAI API key missing)",
        matches: basicMatches,
        isAI: false
      });
    }

    const dogsList = dogs.map(d => ({
      id: d._id,
      name: d.name,
      breed: d.breed,
      size: d.size,
      qualities: d.qualities,
      description: d.description,
      specialNeeds: d.specialNeeds
    }));

    const prompt = `
        You are an expert dog behaviorist and matching assistant for "WoofMate". 
        Based on the user's answers to the following quiz, recommend the top 3 best matching dogs from our current list of available dogs.

        User's Quiz Answers:
        ${JSON.stringify(answers, null, 2)}

        Available Dogs:
        ${JSON.stringify(dogsList, null, 2)}

        Analyze the user's lifestyle, living situation, and preferences against each dog's personality, size, and needs.
        Return ONLY a JSON object with a key "recommendedIds" containing an array of the 3 most suitable dog IDs.
        `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful dog matching assistant. Return only JSON." }, { role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    const recommendedIds = result.recommendedIds;

    const matchedDogs = await DogModel.find({ _id: { $in: recommendedIds } });

    res.status(200).json({
      message: "AI Match completed successfully",
      matches: matchedDogs,
      isAI: true
    });
  } catch (error) {
    console.error("AI Matching Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const seedDogs = async (req, res) => {
  try {
    const mockDogs = req.body;
    await DogModel.deleteMany();
    const dogs = await DogModel.insertMany(mockDogs);
    res.status(201).json({ message: "Dogs seeded successfully", dogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogs, getDogsbyId, postDog, updateDog, matchDogQuiz, matchDogWithAI, seedDogs };