const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DogModel } = require("./models/animal.model");

const mockDogs = [
  {
    name: "Buddy", breed: "Golden Retriever", age: 2, gender: "male", size: "large",
    qualities: "Friendly, Intelligent, Energetic", location: "Mumbai",
    description: "Buddy is a happy-go-lucky Golden Retriever who loves attention. He is great with kids and other pets.",
    history: "Rescued from a busy street.", specificNeeds: "Needs regular exercise and grooming.",
    images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Luna", breed: "Beagle", age: 3, gender: "female", size: "medium",
    qualities: "Curious, Merry, Friendly", location: "Pune",
    description: "Luna is a sweet Beagle with a great nose for snacks. She loves to cuddle but gets distracted outside.",
    history: "Surrendered by previous owner who moved.", specificNeeds: "Needs a secure backyard as she loves to follow scents.",
    images: ["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Daisy", breed: "Pug", age: 1, gender: "female", size: "small",
    qualities: "Charming, Mischievous, Loving", location: "Delhi",
    description: "Daisy is a small dog with a big personality. She's a lap dog through and through.",
    history: "Born in a rescue foster home.", specificNeeds: "Needs a cool environment as she can't handle heat.",
    images: ["https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Max", breed: "German Shepherd", age: 4, gender: "male", size: "large",
    qualities: "Loyal, Courageous, Confident", location: "Bangalore",
    description: "Max is highly trainable and loves having a job to do. Needs an experienced owner.",
    history: "Retired from police training.", specificNeeds: "Requires mental stimulation and heavy exercise.",
    images: ["https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Bella", breed: "French Bulldog", age: 2, gender: "female", size: "small",
    qualities: "Adaptable, Playful, Smart", location: "Mumbai",
    description: "Bella is a clownish, adorable little tank. She loves short walks and long naps.",
    history: "Found wandering in a park.", specificNeeds: "Prone to breathing issues; avoid heavy exertion.",
    images: ["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Charlie", breed: "Labrador Retriever", age: 5, gender: "male", size: "large",
    qualities: "Friendly, Active, Outgoing", location: "Chennai",
    description: "Charlie is the classic family dog. He loves swimming and fetching tennis balls.",
    history: "Family could no longer afford his care.", specificNeeds: "Needs portion control as he loves to eat.",
    images: ["https://images.unsplash.com/photo-1554692911-39a733ecab0d?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Molly", breed: "Poodle", age: 3, gender: "female", size: "medium",
    qualities: "Active, Proud, Very Smart", location: "Hyderabad",
    description: "Molly is incredibly intelligent and learns tricks in minutes. Highly alert.",
    history: "Owner passed away.", specificNeeds: "Requires professional grooming every 6 weeks.",
    images: ["https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Cooper", breed: "Siberian Husky", age: 2, gender: "male", size: "large",
    qualities: "Mischievous, Loyal, Outgoing", location: "Delhi",
    description: "Cooper is vocal, energetic, and a brilliant escape artist. Not for beginners.",
    history: "Surrendered due to high energy levels.", specificNeeds: "Needs extreme exercise and a cold climate preference.",
    images: ["https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Lola", breed: "Dachshund", age: 4, gender: "female", size: "small",
    qualities: "Spunky, Curious, Friendly", location: "Pune",
    description: "Lola is a brave little hound who thinks she's a Doberman. Loves burrowing in blankets.",
    history: "Rescued from a puppy mill.", specificNeeds: "Needs stairs/ramps for furniture to protect her back.",
    images: ["https://images.unsplash.com/photo-1612222869049-d8bc93630fbc?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Rocky", breed: "Boxer", age: 3, gender: "male", size: "large",
    qualities: "Fun-loving, Bright, Active", location: "Kolkata",
    description: "Rocky is pure muscle and pure joy. He jumps when excited and loves everyone.",
    history: "Found tied to a fence.", specificNeeds: "Needs an active family to burn off his bouncy energy.",
    images: ["https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Sadie", breed: "Border Collie", age: 2, gender: "female", size: "medium",
    qualities: "Affectionate, Smart, Energetic", location: "Bangalore",
    description: "Sadie is a workaholic. She needs a job, whether it's agility training or herding.",
    history: "Surrendered by an apartment dweller.", specificNeeds: "Requires 2+ hours of intense physical and mental exercise.",
    images: ["https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Duke", breed: "Great Dane", age: 1, gender: "male", size: "large",
    qualities: "Friendly, Patient, Dependable", location: "Mumbai",
    description: "Duke is a gentle giant who thinks he's a lap dog. Great with children.",
    history: "Owner relocated internationally.", specificNeeds: "Needs a large bed and raised food bowls. Prone to bloat.",
    images: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Stella", breed: "Shih Tzu", age: 6, gender: "female", size: "small",
    qualities: "Affectionate, Playful, Outgoing", location: "Delhi",
    description: "Stella was bred for royalty and acts like it. She wants to be pampered all day.",
    history: "Rescued from a hoarding situation.", specificNeeds: "Needs daily brushing to prevent matting.",
    images: ["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Tucker", breed: "Australian Shepherd", age: 3, gender: "male", size: "medium",
    qualities: "Smart, Work-oriented, Exuberant", location: "Pune",
    description: "Tucker is incredibly loyal and eager to please. He excels at frisbee.",
    history: "Farm dog that chased cars too much.", specificNeeds: "Needs a securely fenced yard.",
    images: ["https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Zoe", breed: "Yorkshire Terrier", age: 4, gender: "female", size: "small",
    qualities: "Affectionate, Sprightly, Tomboyish", location: "Hyderabad",
    description: "Zoe is tiny but fierce. She is an excellent watchdog and very loyal.",
    history: "Found abandoned in a pet carrier.", specificNeeds: "Can be snappy with toddlers; best for adult homes.",
    images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Bear", breed: "Rottweiler", age: 5, gender: "male", size: "large",
    qualities: "Loyal, Loving, Confident", location: "Chennai",
    description: "Bear looks intimidating but is a huge softie underneath. Loves leaning on people.",
    history: "Owner passed away.", specificNeeds: "Needs a strong handler who uses positive reinforcement.",
    images: ["https://images.unsplash.com/photo-1563889958744-806aa548aabe?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Penny", breed: "Cocker Spaniel", age: 2, gender: "female", size: "medium",
    qualities: "Gentle, Smart, Happy", location: "Kolkata",
    description: "Penny has the sweetest eyes and a tail that never stops wagging. Loves nature walks.",
    history: "Surrendered due to allergies.", specificNeeds: "Prone to ear infections; ears must be kept dry.",
    images: ["https://plus.unsplash.com/premium_photo-1668208365825-9a84aadddb50?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Oliver", breed: "Corgi", age: 3, gender: "male", size: "small",
    qualities: "Affectionate, Smart, Alert", location: "Bangalore",
    description: "Oliver has a big bark for a small dog. He loves herding family members.",
    history: "Bought from a breeder, then surrendered.", specificNeeds: "Needs exercise to prevent obesity.",
    images: ["https://images.unsplash.com/photo-1612536057832-2ce7def8ee14?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Ruby", breed: "Doberman Pinscher", age: 4, gender: "female", size: "large",
    qualities: "Loyal, Fearless, Alert", location: "Mumbai",
    description: "Ruby is sleek, powerful, and incredibly intelligent. She bonds deeply with one person.",
    history: "Retired guard dog.", specificNeeds: "Needs mental training (obedience/agility) to stay happy.",
    images: ["https://images.unsplash.com/photo-1629898030230-01fac0ebf4c5?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Leo", breed: "Chihuahua", age: 5, gender: "male", size: "small",
    qualities: "Charming, Graceful, Sassy", location: "Delhi",
    description: "Leo prefers to be carried everywhere. He bonds to a single person and guards them fiercely.",
    history: "Rescued from a shelter.", specificNeeds: "Sensitive to cold; needs sweaters in winter.",
    images: ["https://images.unsplash.com/photo-1605639744116-2da171d604e7?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Chloe", breed: "Bulldog", age: 3, gender: "female", size: "medium",
    qualities: "Friendly, Courageous, Calm", location: "Pune",
    description: "Chloe is laid back and loves lounging on the sofa. Very gentle with kids.",
    history: "Owner had a newborn and couldn't cope.", specificNeeds: "Facial wrinkles must be cleaned daily.",
    images: ["https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Buster", breed: "Boston Terrier", age: 2, gender: "male", size: "small",
    qualities: "Friendly, Bright, Amusing", location: "Hyderabad",
    description: "Buster is a lively little gentleman in a tuxedo. Loves playing tug-of-war.",
    history: "Found wandering the streets.", specificNeeds: "Protect eyes from injury as they protrude.",
    images: ["https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Mia", breed: "Maltese", age: 4, gender: "female", size: "small",
    qualities: "Gentle, Playful, Affectionate", location: "Chennai",
    description: "Mia is a glamorous little dog who expects to be the center of attention.",
    history: "Rescued from an illegal breeder.", specificNeeds: "Needs consistent dental care and grooming.",
    images: ["https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Zeus", breed: "Pitbull Terrier", age: 3, gender: "male", size: "large",
    qualities: "Confident, Smart, Good-natured", location: "Bangalore",
    description: "Zeus is a goofy, loving couch potato who doesn't know how big he is.",
    history: "Rescued from a dog fighting ring; fully rehabilitated.", specificNeeds: "Needs a strong owner and breed-experienced home.",
    images: ["https://images.unsplash.com/photo-1598133894008-61f7fbf86b03?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Lily", breed: "Bichon Frise", age: 2, gender: "female", size: "small",
    qualities: "Playful, Curious, Peppy", location: "Mumbai",
    description: "Lily is a fluffy white cloud. She loves everyone she meets and has zero shedding.",
    history: "Owner developed severe allergies.", specificNeeds: "Prone to separation anxiety.",
    images: ["https://plus.unsplash.com/premium_photo-1668208365152-7b00a501e74f?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Finn", breed: "Jack Russell Terrier", age: 1, gender: "male", size: "small",
    qualities: "Alert, Inquisitive, Lively", location: "Pune",
    description: "Finn is a rocket. He never runs out of energy and loves digging holes.",
    history: "Too energetic for previous senior owner.", specificNeeds: "High prey drive; cannot live with cats.",
    images: ["https://images.unsplash.com/photo-1618342418520-21a48c4125b0?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Abby", breed: "Greyhound", age: 5, gender: "female", size: "large",
    qualities: "Gentle, Independent, Noble", location: "Delhi",
    description: "Abby is a retired racer. Surprisingly, she is a massive couch potato and sleeps 18 hours a day.",
    history: "Retired from the racing track.", specificNeeds: "Must always be kept on a leash in unfenced areas.",
    images: ["https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Jasper", breed: "Dalmatian", age: 2, gender: "male", size: "large",
    qualities: "Dignified, Smart, Outgoing", location: "Kolkata",
    description: "Jasper is a striking, highly active dog who loves running alongside bicycles.",
    history: "Surrendered at 6 months due to high energy.", specificNeeds: "Requires a specialized low-purine diet.",
    images: ["https://images.unsplash.com/photo-1608226065586-4e0ab8826505?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Sophie", breed: "Cavalier King Charles", age: 4, gender: "female", size: "small",
    qualities: "Affectionate, Gentle, Graceful", location: "Bangalore",
    description: "Sophie is the ultimate lap dog. She matches her owner's mood perfectly.",
    history: "Rescued from a breeding facility.", specificNeeds: "Prone to heart conditions; needs annual vet checks.",
    images: ["https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=600&auto=format&fit=crop"]
  },
  {
    name: "Bruno", breed: "Indian Pariah Dog", age: 1, gender: "male", size: "medium",
    qualities: "Alert, Highly Intelligent, Loyal", location: "Mumbai",
    description: "Bruno is a native indie dog. Extremely healthy, street smart, and fiercely loving.",
    history: "Rescued from the streets as a puppy.", specificNeeds: "Needs socialization training as he can be wary of strangers.",
    images: ["https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=600&auto=format&fit=crop"]
  }
];

mongoose.connect(process.env.MONGOURL)
  .then(async () => {
    console.log("Connected to MongoDB...");
    await DogModel.deleteMany();
    console.log("Cleared old dog data.");
    await DogModel.insertMany(mockDogs);
    console.log(`Successfully seeded ${mockDogs.length} dogs.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Database seed error:", err);
    mongoose.connection.close();
  });
