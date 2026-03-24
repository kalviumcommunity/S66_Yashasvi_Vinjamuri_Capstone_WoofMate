const dogBreed = [
  {
    name: "Golden Retriever",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "4-6 hours",
      activityLevel: "moderately active",
      aloneTime: "2-4 hours",
      experience: "yes",
      training: "yes",
      size: "medium",
      traits: ["playful and energetic", "good with children", "good with other animals"],
      allergies: "no",
      senior: "no",
      grooming: "medium"
    },
    description: "Golden Retrievers are friendly, intelligent, and great with families."
  },
  {
    name: "Bulldog",
    criteria: {
      homeType: "apartment",
      fencedYard: "no",
      householdSize: "2",
      children: "no",
      otherPets: "yes",
      timeWithDog: "2-4 hours",
      activityLevel: "not very active",
      aloneTime: "5-8 hours",
      experience: "no",
      training: "yes",
      size: "medium",
      traits: ["calm and laid-back", "low exercise needs"],
      allergies: "no",
      senior: "yes",
      grooming: "low"
    },
    description: "Bulldogs are gentle, easygoing, and adapt well to apartment life."
  },
  {
    name: "Border Collie",
    criteria: {
      homeType: "farm",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "more than 6 hours",
      activityLevel: "very active",
      aloneTime: "less than 2 hours",
      experience: "yes",
      training: "yes",
      size: "medium",
      traits: ["playful and energetic", "good with children"],
      allergies: "no",
      senior: "no",
      grooming: "medium"
    },
    description: "Border Collies are energetic and intelligent, great for active families or rural settings."
  },
  {
    name: "Chihuahua",
    criteria: {
      homeType: "apartment",
      fencedYard: "no",
      householdSize: "1",
      children: "no",
      otherPets: "no",
      timeWithDog: "more than 6 hours",
      activityLevel: "moderately active",
      aloneTime: "2-4 hours",
      experience: "no",
      training: "no",
      size: "small",
      traits: ["good with other animals", "low exercise needs"],
      allergies: "no",
      senior: "yes",
      grooming: "low"
    },
    description: "Chihuahuas are loyal lapdogs and ideal for small households or apartments."
  },
  {
    name: "Labrador Retriever",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "4-6 hours",
      activityLevel: "very active",
      aloneTime: "2-4 hours",
      experience: "yes",
      training: "yes",
      size: "large",
      traits: ["playful and energetic", "good with children", "good with other animals"],
      allergies: "no",
      senior: "no",
      grooming: "medium"
    },
    description: "Labradors are outgoing, affectionate, and perfect for active families."
  },
  {
    name: "Poodle",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "2",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "2-4 hours",
      activityLevel: "moderately active",
      aloneTime: "2-4 hours",
      experience: "no",
      training: "yes",
      size: "medium",
      traits: ["good with children", "low exercise needs"],
      allergies: "no",
      senior: "no",
      grooming: "high"
    },
    description: "Poodles are smart, hypoallergenic, and come in various sizes—great for allergy-sensitive homes."
  },
  {
    name: "Shih Tzu",
    criteria: {
      homeType: "apartment",
      fencedYard: "no",
      householdSize: "2",
      children: "no",
      otherPets: "no",
      timeWithDog: "2-4 hours",
      activityLevel: "not very active",
      aloneTime: "5-8 hours",
      experience: "no",
      training: "no",
      size: "small",
      traits: ["calm and laid-back", "low exercise needs"],
      allergies: "yes",
      senior: "yes",
      grooming: "high"
    },
    description: "Shih Tzus are loving lapdogs with a royal history—perfect for quiet homes."
  },
  {
    name: "German Shepherd",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "no",
      timeWithDog: "more than 6 hours",
      activityLevel: "very active",
      aloneTime: "less than 2 hours",
      experience: "yes",
      training: "yes",
      size: "large",
      traits: ["playful and energetic"],
      allergies: "no",
      senior: "no",
      grooming: "medium"
    },
    description: "German Shepherds are loyal, protective, and thrive with structure and training."
  },
  {
    name: "Beagle",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "4-6 hours",
      activityLevel: "moderately active",
      aloneTime: "2-4 hours",
      experience: "no",
      training: "yes",
      size: "medium",
      traits: ["playful and energetic", "good with children"],
      allergies: "no",
      senior: "no",
      grooming: "low"
    },
    description: "Beagles are curious, friendly, and great with kids and other pets."
  },
  {
    name: "Dachshund",
    criteria: {
      homeType: "apartment",
      fencedYard: "no",
      householdSize: "1",
      children: "no",
      otherPets: "no",
      timeWithDog: "2-4 hours",
      activityLevel: "not very active",
      aloneTime: "2-4 hours",
      experience: "no",
      training: "no",
      size: "small",
      traits: ["calm and laid-back", "low exercise needs"],
      allergies: "no",
      senior: "yes",
      grooming: "low"
    },
    description: "Dachshunds are independent, loyal, and perfect for small living spaces."
  },
  {
    name: "Boxer",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "3-5",
      children: "yes",
      otherPets: "no",
      timeWithDog: "4-6 hours",
      activityLevel: "very active",
      aloneTime: "2-4 hours",
      experience: "yes",
      training: "yes",
      size: "large",
      traits: ["playful and energetic", "good with children"],
      allergies: "no",
      senior: "no",
      grooming: "low"
    },
    description: "Boxers are energetic and protective, ideal for active families with children."
  },
  {
    name: "Cocker Spaniel",
    criteria: {
      homeType: "house with yard",
      fencedYard: "yes",
      householdSize: "2",
      children: "yes",
      otherPets: "yes",
      timeWithDog: "more than 6 hours",
      activityLevel: "moderately active",
      aloneTime: "less than 2 hours",
      experience: "no",
      training: "yes",
      size: "medium",
      traits: ["good with children", "good with other animals"],
      allergies: "no",
      senior: "yes",
      grooming: "high"
    },
    description: "Cocker Spaniels are affectionate and cheerful, great for loving households with time to groom."
  },
  {
    name: "Greyhound",
    criteria: {
      homeType: "apartment",
      fencedYard: "no",
      householdSize: "1",
      children: "no",
      otherPets: "no",
      timeWithDog: "2-4 hours",
      activityLevel: "moderately active",
      aloneTime: "5-8 hours",
      experience: "no",
      training: "no",
      size: "large",
      traits: ["calm and laid-back", "low exercise needs"],
      allergies: "yes",
      senior: "yes",
      grooming: "low"
    },
    description: "Greyhounds are surprisingly low-energy and do well in quiet, relaxed homes."
  }
];

export default dogBreed;
