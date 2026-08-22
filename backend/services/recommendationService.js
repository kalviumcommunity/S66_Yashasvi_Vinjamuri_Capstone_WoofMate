const normalize = (value) => (value || "").toString().toLowerCase().trim();

const toText = (dog) => {
  return [
    dog.breed,
    dog.size,
    dog.qualities,
    dog.description,
    dog.history,
    dog.specificNeeds,
    dog.specialNeeds,
    dog.location,
  ]
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

const scoreMap = {
  apartment: ["apartment", "indoor", "small", "calm"],
  house: ["yard", "outdoor", "active", "large"],
  lowEnergy: ["calm", "gentle", "indoor", "easy"],
  mediumEnergy: ["playful", "social", "friendly"],
  highEnergy: ["active", "energetic", "hiking", "exercise", "working"],
  kids: ["family", "gentle", "patient", "friendly", "kids"],
  noKids: ["single", "quiet", "independent"],
  dogs: ["social", "dog friendly", "pack"],
  cats: ["cat friendly", "gentle", "calm"],
  smallPets: ["gentle", "low prey", "calm"],
  lowGrooming: ["low maintenance", "short coat", "easy grooming"],
  moderateGrooming: ["regular grooming", "weekly brushing"],
  highGrooming: ["thick coat", "double coat", "professional grooming"],
  trainingLow: ["trained", "easy", "beginner"],
  trainingHigh: ["intelligent", "working", "trainable"],
};

const extractSignals = (preferences = {}) => {
  const p = Object.fromEntries(Object.entries(preferences).map(([k, v]) => [k, normalize(v)]));

  return {
    living:
      p.livingEnvironment === "apartment"
        ? scoreMap.apartment
        : scoreMap.house,
    activity:
      p.activityLevel.includes("couch") || p.activityLevel.includes("occasional")
        ? scoreMap.lowEnergy
        : p.activityLevel.includes("daily")
          ? scoreMap.mediumEnergy
          : scoreMap.highEnergy,
    children: p.children.includes("no") ? scoreMap.noKids : scoreMap.kids,
    pets: p.otherPets.includes("cat")
      ? scoreMap.cats
      : p.otherPets.includes("dog")
        ? scoreMap.dogs
        : p.otherPets.includes("small")
          ? scoreMap.smallPets
          : [],
    grooming:
      p.groomingTolerance.includes("minimal")
        ? scoreMap.lowGrooming
        : p.groomingTolerance.includes("weekly")
          ? scoreMap.moderateGrooming
          : scoreMap.highGrooming,
    training: p.trainingCommitment.includes("pre-trained") ? scoreMap.trainingLow : scoreMap.trainingHigh,
    size: p.sizePreference,
  };
};

const getRecommendations = (dogs = [], preferences = {}) => {
  const signals = extractSignals(preferences);

  const matches = dogs
    .map((dog) => {
      const text = toText(dog);
      let score = 0;
      const reasons = [];

      const scoreKeywords = (keywords, label, weight = 10) => {
        if (!keywords?.length) return;
        const hits = keywords.filter((k) => text.includes(k));
        if (hits.length) {
          const points = Math.min(weight, hits.length * 3);
          score += points;
          reasons.push(`${label}: ${hits[0]}`);
        }
      };

      if (signals.size && normalize(dog.size) === signals.size) {
        score += 12;
        reasons.push(`Size match: ${dog.size}`);
      }

      scoreKeywords(signals.living, "Home fit", 12);
      scoreKeywords(signals.activity, "Energy fit", 12);
      scoreKeywords(signals.children, "Family fit", 10);
      scoreKeywords(signals.pets, "Pet compatibility", 8);
      scoreKeywords(signals.grooming, "Care fit", 8);
      scoreKeywords(signals.training, "Training fit", 8);

      return {
        dog,
        score,
        reasons: reasons.slice(0, 4),
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return matches;
};

module.exports = { getRecommendations };
