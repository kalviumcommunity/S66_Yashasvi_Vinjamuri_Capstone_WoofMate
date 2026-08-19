const { DogModel } = require('../models/animal.model');
const QuizAttempt = require('../models/quizAttempt.model');
const { getRecommendations } = require('../services/recommendationService');

const requiredFields = [
  'activityLevel',
  'timeAvailable',
  'livingEnvironment',
  'sizePreference',
  'experience',
  'children',
  'otherPets',
  'groomingTolerance',
  'energyPreference',
];

const createRecommendations = async (req, res) => {
  try {
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');
    if (missingFields.length) {
      return res.status(400).json({ error: `Missing required quiz answers: ${missingFields.join(', ')}` });
    }

    const preferences = {
      ...req.body,
      children: req.body.children === true || req.body.children === 'true',
      otherPets: Array.isArray(req.body.otherPets) ? req.body.otherPets : [],
    };
    const dogs = await DogModel.find({});
    const recommendations = getRecommendations(dogs, preferences);
    let saved = false;

    if (req.user) {
      try {
        await QuizAttempt.create({
          user: req.user.id,
          answers: req.body,
          recommendedDogs: recommendations.map(({ dog }) => dog._id),
          recommendedMatches: recommendations.map(({ dog, score, reasons }) => ({ dog: dog._id, score, reasons })),
          summary: 'Personalized recommendations generated from your lifestyle quiz.',
        });
        saved = true;
      } catch (saveError) {
        console.error('[createRecommendations] Save failed:', saveError.message);
      }
    }

    return res.status(200).json({ recommendations, saved });
  } catch (error) {
    console.error('Recommendation Error:', error);
    return res.status(500).json({ error: 'Could not generate recommendations' });
  }
};

const normalizeLegacyAnswers = (answers) => {
  const activity = String(answers.activityLevel || '').toLowerCase();
  const living = String(answers.livingSituation || answers.homeType || '').toLowerCase();
  const children = String(answers.hasChildren || answers.children || '').toLowerCase();
  const pets = String(answers.hasOtherPets || answers.otherPets || '').toLowerCase();
  const grooming = String(answers.groomingTime || answers.grooming || '').toLowerCase();
  const size = String(answers.preferredSize || answers.size || '').toLowerCase();

  return {
    activityLevel: activity.includes('couch') || activity.includes('not very') ? 'low' : activity.includes('occasional') || activity.includes('moderate') ? 'moderate' : 'high',
    timeAvailable: String(answers.timeAvailable || answers.timeWithDog || '').toLowerCase().includes('less than 2') ? 'limited' : 'moderate',
    livingEnvironment: living.includes('apartment') ? 'apartment' : 'house',
    sizePreference: size.includes('small') || size.includes('toy') ? 'small' : size.includes('large') || size.includes('giant') ? 'large' : 'medium',
    experience: String(answers.experience || '').toLowerCase() === 'no' ? 'beginner' : 'experienced',
    children: !children.includes('no'),
    otherPets: pets.includes('cat') ? ['cat'] : pets.includes('dog') ? ['dog'] : pets.includes('no') ? [] : ['other'],
    groomingTolerance: grooming.includes('minimal') || grooming.includes('low') ? 'low' : grooming.includes('professional') || grooming.includes('high') ? 'high' : 'moderate',
    energyPreference: activity.includes('couch') || activity.includes('not very') ? 'low' : activity.includes('occasional') || activity.includes('moderate') ? 'moderate' : 'high',
  };
};

const matchDogWithLocalRecommendations = async (req, res) => {
  try {
    const answers = req.body || {};
    const dogs = await DogModel.find({});
    const preferences = normalizeLegacyAnswers(answers);
    const recommendations = getRecommendations(dogs, preferences);
    const matches = recommendations.map(({ dog }) => dog);
    const summary = recommendations.length
      ? `We found ${recommendations.length} dogs whose size, energy, and care needs best fit your lifestyle.`
      : 'We could not find a close match from the current dog listings.';
    let saved = false;

    if (req.user) {
      try {
        await QuizAttempt.create({
          user: req.user.id,
          answers,
          recommendedDogs: matches.map((dog) => dog._id),
          recommendedMatches: recommendations.map(({ dog, score, reasons }) => ({ dog: dog._id, score, reasons })),
          summary,
        });
        saved = true;
      } catch (saveError) {
        console.error('[matchDogWithLocalRecommendations] Save failed:', saveError.message);
      }
    }

    return res.status(200).json({
      message: 'Programmatic matching completed successfully',
      matches,
      recommendations,
      summary,
      isAI: false,
      saved,
    });
  } catch (error) {
    console.error('Local Recommendation Error:', error);
    return res.status(500).json({ error: 'Could not calculate dog recommendations' });
  }
};

module.exports = { createRecommendations, matchDogWithLocalRecommendations };
