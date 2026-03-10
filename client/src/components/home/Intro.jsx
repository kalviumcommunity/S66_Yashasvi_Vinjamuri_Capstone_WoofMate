import React from "react";
import image from "../../assets/image.png";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div
      className="relative h-[600px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4 gap-6">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold">
          Find your perfect companion
        </h2>

        <p className="text-white text-base sm:text-lg md:text-xl max-w-xl">
          Connect with a furry friend that matches your lifestyle. Every dog
          deserves a loving home & Every home deserves a loving dog
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/adopt">
            <button className="w-full sm:w-auto bg-black hover:bg-white border border-gray-200 hover:text-black hover:border-white text-white px-6 py-2 rounded-md text-base sm:text-lg transition">
              Find a Dog
            </button>
          </Link>
          <Link to="/rescue">
            <button className="w-full sm:w-auto bg-transparent border border-white hover:bg-gray-600 text-white px-6 py-2 rounded-md text-base sm:text-lg transition">
              Report a Dog
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
