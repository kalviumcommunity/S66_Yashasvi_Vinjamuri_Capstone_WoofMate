const WEIGHTS = {
  activity: 25,
  time: 20,
  livingEnvironment: 15,
  size: 10,
  experience: 10,
  children: 10,
  otherPets: 5,
  grooming: 5,
};

const normalize = (value) => String(value || '').trim().toLowerCase();

const textForDog = (dog) => [
  dog.qualities,
  dog.description,
  dog.history,
  dog.specificNeeds,
].filter(Boolean).join(' ').toLowerCase();

const containsAny = (text, terms) => terms.some((term) => text.includes(term));

const textCompatibility = (text, positiveTerms, negativeTerms = []) => {
  const hasPositive = containsAny(text, positiveTerms);
  const hasNegative = containsAny(text, negativeTerms);

  if (!hasPositive && !hasNegative) return null;
  if (hasPositive && hasNegative) return 0.5;
  return hasPositive ? 1 : 0;
};

const userHasOtherPets = (otherPets) => Array.isArray(otherPets) && otherPets.length > 0;

const isHardIncompatible = (dog, preferences) => {
  const text = textForDog(dog);
  const apartment = normalize(preferences.livingEnvironment) === 'apartment';
  const hasChildren = preferences.children === true;
  const hasOtherPets = userHasOtherPets(preferences.otherPets);

  if (apartment && containsAny(text, [
    'not suitable for apartment',
    'unsuitable for apartment',
    'cannot live in an apartment',
    'needs a yard',
    'requires a yard',
  ])) return true;

  if (hasChildren && containsAny(text, [
    'not good with children',
    'not good with kids',
    'incompatible with children',
    'incompatible with kids',
  ])) return true;

  if (hasOtherPets && containsAny(text, [
    'not good with other pets',
    'not good with cats',
    'not good with dogs',
    'incompatible with pets',
    'cannot live with cats',
  ])) return true;

  return false;
};

const scoreDog = (dog, preferences) => {
  const text = textForDog(dog);
  const scores = [];

  const activityTerms = normalize(preferences.activityLevel) === 'high'
    ? ['active', 'energetic', 'high energy', 'exercise', 'running', 'hiking', 'playful']
    : normalize(preferences.activityLevel) === 'low'
      ? ['calm', 'gentle', 'quiet', 'low energy', 'relaxed', 'laid-back']
      : ['moderate', 'playful', 'easygoing', 'adaptable'];
  const activity = textCompatibility(text, activityTerms);
  if (activity !== null) scores.push(['activity', activity]);

  const time = normalize(preferences.timeAvailable) === 'limited'
    ? textCompatibility(text, ['low maintenance', 'short walks', 'independent', 'calm', 'easygoing'], ['needs constant exercise', 'high maintenance'])
    : normalize(preferences.timeAvailable) === 'a lot'
      ? textCompatibility(text, ['active', 'energetic', 'exercise', 'running', 'hiking', 'playful'])
      : textCompatibility(text, ['moderate', 'adaptable', 'easygoing', 'playful']);
  if (time !== null) scores.push(['time', time]);

  const living = normalize(preferences.livingEnvironment) === 'apartment'
    ? textCompatibility(text, ['apartment-friendly', 'apartment friendly', 'indoor', 'quiet', 'small space'])
    : textCompatibility(text, ['house', 'yard', 'outdoor', 'active']);
  if (living !== null) scores.push(['livingEnvironment', living]);

  const sizePreference = normalize(preferences.sizePreference);
  if (sizePreference && normalize(dog.size) === sizePreference) scores.push(['size', 1]);
  else if (sizePreference && dog.size) scores.push(['size', 0]);

  const experience = normalize(preferences.experience) === 'beginner'
    ? textCompatibility(text, ['beginner', 'first-time', 'easy to train', 'easygoing', 'gentle'])
    : textCompatibility(text, ['experienced owner', 'training', 'strong-willed', 'high energy']);
  if (experience !== null) scores.push(['experience', experience]);

  if (preferences.children === true) {
    const children = textCompatibility(text, ['good with children', 'good with kids', 'family-friendly', 'family friendly', 'gentle with children']);
    if (children !== null) scores.push(['children', children]);
  }

  if (userHasOtherPets(preferences.otherPets)) {
    const pets = textCompatibility(text, ['good with other pets', 'good with cats', 'good with dogs', 'pet-friendly', 'pet friendly']);
    if (pets !== null) scores.push(['otherPets', pets]);
  }

  const grooming = normalize(preferences.groomingTolerance) === 'low'
    ? textCompatibility(text, ['low grooming', 'low-maintenance', 'low maintenance', 'easy to groom', 'short coat'], ['regular grooming', 'frequent grooming'])
    : textCompatibility(text, ['grooming', 'brushing', 'coat care']);
  if (grooming !== null) scores.push(['grooming', grooming]);

  const energyPreference = normalize(preferences.energyPreference);
  if (energyPreference && activity === null) {
    const energy = energyPreference === 'high'
      ? textCompatibility(text, ['high energy', 'energetic', 'active', 'playful'])
      : energyPreference === 'low'
        ? textCompatibility(text, ['low energy', 'calm', 'quiet', 'relaxed'])
        : textCompatibility(text, ['moderate', 'easygoing', 'adaptable']);
    if (energy !== null) scores.push(['activity', energy]);
  }

  const totalWeight = scores.reduce((sum, [criterion]) => sum + (WEIGHTS[criterion] || 0), 0);
  const weightedScore = scores.reduce((sum, [criterion, value]) => sum + value * (WEIGHTS[criterion] || 0), 0);
  const score = totalWeight ? Math.round((weightedScore / totalWeight) * 100) : 50;

  const reasons = [];
  if (sizePreference && normalize(dog.size) === sizePreference) reasons.push(`Matches your ${sizePreference} size preference`);
  if (activity === 1) reasons.push('Fits your activity level');
  if (living === 1) reasons.push('Fits your living environment');
  if (preferences.children === true && textCompatibility(text, ['good with children', 'good with kids', 'family-friendly', 'family friendly', 'gentle with children']) === 1) reasons.push('Described as a good family fit');
  if (userHasOtherPets(preferences.otherPets) && textCompatibility(text, ['good with other pets', 'good with cats', 'good with dogs', 'pet-friendly', 'pet friendly']) === 1) reasons.push('Described as comfortable with other pets');
  if (reasons.length < 2 && dog.qualities) reasons.push(String(dog.qualities).split(/[.!?]/)[0].trim().slice(0, 100));
  if (reasons.length < 2) reasons.push('A potential match from the available dog information');

  return { score: Math.max(0, Math.min(100, score)), reasons: reasons.slice(0, 4) };
};

const getRecommendations = (dogs, preferences) => dogs
  .filter((dog) => !isHardIncompatible(dog, preferences))
  .map((dog) => ({ dog, ...scoreDog(dog, preferences) }))
  .sort((first, second) => second.score - first.score)
  .slice(0, 5);

module.exports = { getRecommendations };
