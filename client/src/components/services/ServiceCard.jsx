import React, { useState } from "react";
import {
  Scissors,
  Stethoscope,
  Dog,
  Home,
  GraduationCap,
  Utensils,
  ArrowRight,
  X,
} from "lucide-react";

const services = [
  {
    icon: <Scissors size={24} className="text-indigo-700" />,
    bg: "bg-[#E0BBE4]",
    title: "Dog Grooming",
    details:
      "Professional grooming services to keep your dog clean, healthy, and looking their best. Awail services like:",
    items:["Bathing","Brushing Teeth", "Haircut", "Nail trimming", "Overall health checkup"]
  },
  {
    icon: <Stethoscope size={24} className="text-purple-700" />,
    bg: "bg-[#D5E1DF]",
    title: "Veterinary Care",
    details:
      "Quality healthcare for your dog, including check-ups, vaccinations, and specialized treatments.",
    items:["Vaccination", "Injury treatment", "Infections treatment", "Senior dog care", "Puppy care"]
  },
  {
    icon: <Dog size={24} className="text-pink-700" />,
    bg: "bg-[#FFDAC1]",
    title: "Dog Walking",
    details:
      "Reliable dog walking services to ensure your pet gets the exercise they need when you're busy.",
    items:["long walks for high energy dogs", "Strength building activities", "Park play time"]
  },
  {
    icon: <Home size={24} className="text-blue-700" />,
    bg: "bg-[#B5EAD7]",
    title: "Doggy Daycare",
    details:
      "Safe and fun environment for your dog to socialize and play while you're at work or away.",
    items:["Play time", "Feeding sessions", "Training sessions", "Nap time"]
  },
  {
    icon: <GraduationCap size={24} className="text-yellow-700" />,
    bg: "bg-[#FFF1BA]",
    title: "Training Classes",
    details:
      "Effective training programs for dogs of all ages, from basic obedience to advanced skills.",
    items:["Basic Commands training", "Service Dog training", "Guard dog training", "K9 training"]
  },
  {
    icon: <Utensils size={24} className="text-green-700" />,
    bg: "bg-[#C7CEEA]",
    title: "Nutrition Counselling",
    details:
      "Expert advice on dog nutrition to ensure your pet maintains optimal health and wellbeing.",
    items:["Muscle building diet", "Fat loss diet", "Regular diet", "Energetic diet"]
  },
];

const ServiceCard = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Dog Care Services
      </h1>
      <p className="text-center text-gray-600 mb-10">
        We offer a wide range of services to keep your dog healthy, happy, and
        well-cared for.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <div className="mb-4 flex justify-center">
              <span
                className={`p-3 rounded-full ${service.bg} inline-flex items-center justify-center`}
              >
                {service.icon}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {service.details.slice(0, 70)}...
            </p>
            <button
              onClick={() => setSelectedService(service)}
              className="text-gray-700 hover:underline font-medium inline-flex items-center gap-1"
            >
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-lg transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <div className="flex items-center justify-center mb-4">
              <span className={`p-3 rounded-full ${selectedService.bg}`}>
                {selectedService.icon}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {selectedService.title}
            </h2>
            <p className="text-gray-700 text-center">
              {selectedService.details}
            </p>
            <p className="text-gray-700 ">
              {selectedService.items?.map((item)=>{
                return <li>{item}</li>
              })}
            </p>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes modalIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-modal-in {
            animation: modalIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ServiceCard;
