const { DogModel } = require("../models/animal.model");
const QuizAttempt = require("../models/quizAttempt.model");
const { getRecommendations } = require("../services/recommendationService");

const normalizeLegacyAnswers = (answers = {}) => {
  return {
    livingEnvironment: answers.livingEnvironment || answers.livingSituation || "",
    activityLevel: answers.activityLevel || "",
    children: answers.children || answers.hasChildren || "",
    otherPets: answers.otherPets || "",
    groomingTolerance: answers.groomingTolerance || answers.groomingTime || "",
    sizePreference: (answers.sizePreference || answers.preferredSize || "").toLowerCase(),
    trainingCommitment: answers.trainingCommitment || answers.trainingTime || "",
    biggestConcern: answers.biggestConcern || "",
  };
};

const saveAttempt = async (req, answers, matches) => {
  if (!req.user?.id) return false;

  await QuizAttempt.create({
    user: req.user.id,
    answers,
    recommendedDogs: matches.map((m) => m.dog._id),
    recommendedMatches: matches.map((m) => ({
      dog: m.dog._id,
      score: m.score,
      reasons: m.reasons,
    })),
    summary: "Your matches are based on your home, lifestyle, and care preferences.",
  });

  return true;
};

const createRecommendations = async (req, res) => {
  try {
    const preferences = normalizeLegacyAnswers(req.body);
    const dogs = await DogModel.find();
    const matches = getRecommendations(dogs, preferences);

    const saved = await saveAttempt(req, preferences, matches);

    res.status(200).json({
      message: "Recommendations generated successfully",
      matches: matches.map((m) => ({ ...m.dog.toObject(), score: m.score, reasons: m.reasons })),
      saved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const matchDogWithLocalRecommendations = async (req, res) => {
  try {
    const answers = req.body || {};
    const preferences = normalizeLegacyAnswers(answers);
    const dogs = await DogModel.find();

    const matches = getRecommendations(dogs, preferences);
    const saved = await saveAttempt(req, answers, matches);

    res.status(200).json({
      message: "Programmatic matching used",
      matches: matches.map((m) => m.dog),
      rankedMatches: matches,
      summary: "These dogs best match your lifestyle and preferences.",
      isAI: false,
      saved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecommendations,
  matchDogWithLocalRecommendations,
  normalizeLegacyAnswers,
};
