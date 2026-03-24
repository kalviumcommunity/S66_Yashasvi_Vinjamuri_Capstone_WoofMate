import React from "react";
import { Search } from "lucide-react";

const Intro = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-16 my-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Find your Perfect Companion
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center md:text-left">
        Browse our available dogs and filter by size, gender, and other traits
        to find your perfect match.
      </p>

      <div className="relative mb-10">
        <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for dogs by breed, gender, age"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8">

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Size</h3>
          <div className="flex gap-4">
            {["Small", "Medium", "Large"].map((size) => (
              <div
                key={size}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 cursor-pointer hover:bg-indigo-50 hover:border-indigo-500 transition"
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Gender</h3>
          <div className="flex gap-4">
            {["Male", "Female"].map((gender) => (
              <div
                key={gender}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 cursor-pointer hover:bg-indigo-50 hover:border-indigo-500 transition"
              >
                {gender}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
