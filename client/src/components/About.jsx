import React from "react";
import {
  PawPrint,
  HeartHandshake,
  MessageSquareHeart,
  MapPin,
  Gift,
  BadgeCheck,
} from "lucide-react";


const features = [
  {
    title: "Smart Matching",
    description:
      "An AI-powered quiz suggests dogs that suit your lifestyle and personality.",
    icon: <HeartHandshake className="h-8 w-8 text-indigo-600" />,
  },
  {
    title: "Rescue Reporting",
    description:
      "Spotted a stray? Report it with location and image so shelters can respond quickly.",
    icon: <MapPin className="h-8 w-8 text-indigo-600" />,
  },
  {
    title: "Secure Chat",
    description:
      "Built-in chat system lets adopters and shelters communicate privately and safely.",
    icon: <MessageSquareHeart className="h-8 w-8 text-indigo-600" />,
  },
  {
    title: "Donation Portal",
    description:
      "Donate directly to verified rescue organizations through a secure channel.",
    icon: <Gift className="h-8 w-8 text-indigo-600" />,
  },
  {
    title: "Adoption Tracker",
    description:
      "Track your adoption status and revisit your pet's milestones anytime.",
    icon: <BadgeCheck className="h-8 w-8 text-indigo-600" />,
  },
  {
    title: "Community Features",
    description:
      "Explore events, articles, and share your adoption journey with others.",
    icon: <PawPrint className="h-8 w-8 text-indigo-600" />,
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 py-16 px-6 md:px-20 max-w-7xl mx-auto rounded-xl shadow-sm">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-6">
        About <span className="text-gray-800">WoofMate</span>
      </h1>
      <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
        WoofMate is a solo-built mission-driven platform designed to make pet
        adoption modern, meaningful, and accessible — one paw at a time.
      </p>

      {/* Personal Story */}
      <div className="md:flex items-center gap-12 mb-20">
        <img
          src="/images/dog-mission.jpg"
          alt="WoofMate Mission"
          className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-md"
        />
        <div className="mt-10 md:mt-0 md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Why I Built WoofMate
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            WoofMate was born from a passion for animal welfare and a love for
            tech. I wanted to build a real-world solution using full-stack
            development to bridge the gap between adopters and animals in need.
          </p>
          <p className="text-gray-700 text-lg">
            Every feature is handcrafted to bring safety, empathy, and
            efficiency into the adoption process — with no team, just
            dedication.
          </p>
        </div>
      </div>

      {/* Unique Features Grid */}
      <div className="bg-white rounded-3xl shadow-xl p-10 mb-20">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          What Makes WoofMate Unique
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-indigo-50 hover:bg-indigo-100 transition p-6 rounded-2xl shadow flex flex-col items-start gap-4 border border-indigo-100"
            >
              <div className="bg-white rounded-full p-2 shadow">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
          Built With Modern Tools
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          I developed WoofMate using a modern MERN stack, enhanced with
          real-time features, AI, and a thoughtful design.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-indigo-700 font-semibold">
          {[
            "React.js",
            "Vite",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "MongoDB",
            "Socket.io",
            "Firebase Auth",
            "OpenAI API",
            "Render",
            "Vercel",
          ].map((tech) => (
            <span
              key={tech}
              className="bg-indigo-100 px-4 py-2 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 text-white py-12 px-6 rounded-2xl shadow text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Journey</h2>
        <p className="text-lg mb-6">
          Whether you're looking to adopt, support, or be inspired — WoofMate
          welcomes you.
        </p>
        <a
          href="/adopt"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-100 transition"
        >
          Explore Available Dogs
        </a>
      </div>
    </div>
  );
};

export default About;
