import React from "react";
import icon from "../../assets/feature_icon.png";

const FeatureCard = ({ feature }) => {
  const { title, description } = feature;

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 hover:shadow-lg transition duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-3 sm:mb-4">
        <img src={icon} alt="feature icon" className="h-6 w-6 mr-3" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
