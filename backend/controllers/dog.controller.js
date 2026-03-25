const { DogModel } = require('../models/animal.model')
const QuizAttempt = require('../models/quizAttempt.model')
const cloudinary = require('../config/cloudinary')
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getDogs = async (req, res) => {
  try {
    const { gender, size, age, breed } = req.query;
    let query = {};
    
    if (gender) query.gender = gender;
    if (size) query.size = size;
    if (breed) query.breed = new RegExp(breed, 'i');
    
    if (age) {
        if (age === 'puppy') query.age = { $lte: 1 };
        else if (age === 'adult') query.age = { $gt: 1, $lte: 6 };
        else if (age === 'senior') query.age = { $gt: 6 };
    }

    const dogs = await DogModel.find(query);
    res.status(200).json({ "message": "Dogs fetched successfully", dogs })
  } catch (error) {
    console.error("Fetch Dogs Error:", error);
    res.status(400).json({ "error": error.message })
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
    console.log("[matchDogWithAI] Received answers:", JSON.stringify(answers));
    console.log("[matchDogWithAI] req.user:", req.user ? JSON.stringify(req.user) : "null (guest)");
    
    const dogs = await DogModel.find();
    console.log("[matchDogWithAI] Found", dogs.length, "dogs in database");

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here' || process.env.OPENAI_API_KEY.length < 30) {
      // Fallback to basic matching if no real API key is detected
      const basicMatches = dogs.slice(0, 3);

      // Smart Fallback Summary Construction
      let mood = answers.activityLevel === 'Couch potato' ? 'cozy and relaxed' : 'active and energetic';
      let habitat = answers.livingSituation === 'Apartment' ? 'indoor-friendly' : 'outdoorsy';
      let sizeText = answers.preferredSize ? `${answers.preferredSize.toLowerCase()} sized` : 'friendly';
      let childText = answers.hasChildren !== 'No children' ? 'family-friendly' : 'companion';

      const fallbackSummary = `You seem like you need a ${mood} dog that is ${habitat} and ${childText}. A ${sizeText} breed would suit your lifestyle perfectly!`;

      // Save Attempt if user is logged in (Fallback path)
      let saved = false;
      if (req.user) {
        try {
          const attempt = await QuizAttempt.create({
            user: req.user.id,
            answers: answers,
            recommendedDogs: basicMatches.map(d => d._id),
            summary: fallbackSummary
          });
          console.log("[matchDogWithAI] Fallback quiz attempt SAVED. ID:", attempt._id);
          saved = true;
        } catch (saveErr) {
          console.error("[matchDogWithAI] ERROR saving fallback quiz attempt:", saveErr.message);
          console.error("[matchDogWithAI] Full error:", saveErr);
        }
      } else {
        console.log("[matchDogWithAI] No user attached, skipping save.");
      }

      return res.status(200).json({
        message: "Programmatic matching used (OpenAI API key missing or invalid)",
        matches: basicMatches,
        summary: fallbackSummary,
        isAI: false,
        saved
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
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    const recommendedIds = result.recommendedIds;

    const matchedDogs = await DogModel.find({ _id: { $in: recommendedIds } });

    // Generate Summary
    console.log("Generating AI summary...");
    const summaryPrompt = `
        Based on these user answers: ${JSON.stringify(answers)}, 
        provide a 2-sentence friendly summary of what kind of dog owner they are and what dog suits them.
        `;
    const summaryCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful dog matching assistant." }, { role: "user", content: summaryPrompt }],
      model: "gpt-4o-mini",
    });
    const summary = summaryCompletion.choices[0].message.content;
    console.log("AI Summary generated:", summary);

    // Save Attempt if user is logged in
    let saved = false;
    if (req.user) {
      try {
        const attempt = await QuizAttempt.create({
          user: req.user.id,
          answers: answers,
          recommendedDogs: matchedDogs.map(d => d._id),
          summary
        });
        console.log("[matchDogWithAI] AI quiz attempt SAVED. ID:", attempt._id);
        saved = true;
      } catch (saveErr) {
        console.error("[matchDogWithAI] ERROR saving AI quiz attempt:", saveErr.message);
        console.error("[matchDogWithAI] Full error:", saveErr);
      }
    } else {
      console.log("[matchDogWithAI] No user attached (AI path), skipping save.");
    }

    res.status(200).json({
      message: "AI Match completed successfully",
      matches: matchedDogs,
      summary,
      isAI: true,
      saved
    });
  } catch (error) {
    console.error("AI Matching Error detail:", error);
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

const getLatestQuizAttempt = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const latest = await QuizAttempt.findOne({ user: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json(latest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const AdoptionRequest = require('../models/adoption.model');

const requestAdoption = async (req, res) => {
  try {
     const { id } = req.params;
     const userId = req.user?.id;
     
     if (!userId) {
         return res.status(401).json({ error: "You must be logged in to request adoption." });
     }

     const dog = await DogModel.findById(id);
     if (!dog) return res.status(404).json({ error: "Dog not found" });

     const existingRequest = await AdoptionRequest.findOne({ user: userId, dog: id });
     if (existingRequest) {
         return res.status(400).json({ error: "You have already requested to adopt this dog." });
     }

     const newAdoption = new AdoptionRequest({
         user: userId,
         dog: id,
         status: "pending"
     });
     
     await newAdoption.save();

     res.status(200).json({ message: "Adoption request sent successfully! We will contact you soon." });
  } catch(error) {
     res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogs, getDogsbyId, postDog, updateDog, matchDogQuiz, matchDogWithAI, getLatestQuizAttempt, seedDogs, requestAdoption };