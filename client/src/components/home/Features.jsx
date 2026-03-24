import React, { useState, useEffect } from "react";
import axios from "axios";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get("http://localhost:4545/api/features");
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };
    fetchFeatures();
  }, []);

  if (features.length === 0) return null;

  return (
    <div
      className="w-full relative bg-white"
      style={{
        zIndex: 2,
        borderRadius: '40px 40px 0 0',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="w-[90%] mx-auto py-16">
        <div className="text-center max-w-4xl mx-auto mb-12 px-4">
          <p className="text-lg text-[#5F799A] font-medium">
            Find your perfect furry friend
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold my-4 text-gray-800">
            Welcome to WoofMate
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            At WoofMate we are dedicated to helping you find the perfect furry
            companion. Whether you're looking to adopt a dog, in need of dog
            rescue services, or want to support our cause through dog donations,
            we've got you covered. Our AI-powered quiz will match you with the
            best dog based on your lifestyle, home environment, and preferences.
            So let's find your new best friend together!
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-20 px-4 w-[80%]">
            <div className="flex flex-col gap-6 w-full md:w-1/3 max-w-md">
              {features.slice(0, 3).map((feature, i) => (
                <FeatureCard key={i} feature={feature} />
              ))}
            </div>
            <div className="w-full max-w-sm flex justify-center shrink-0">
              <img
                src="https://images.pexels.com/photos/1448055/pexels-photo-1448055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="dogbackpack"
                className="w-full h-auto object-cover rounded-3xl shadow-lg"
                style={{
                  boxShadow: "0 4px 12px rgba(115, 93, 120, 0.3)",
                }}
              />
            </div>
            <div className="flex flex-col gap-6 w-full md:w-1/3 max-w-md">
              {features.slice(3).map((feature, i) => (
                <FeatureCard key={i + 3} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
