import React from "react";
import { Link } from "react-router-dom";
import FloatingPaws from "./FloatingPaws";

const AuthIntro = ({ heading, subheading, buttonText, buttonLink }) => {
  return (
    <div className="w-full md:w-1/2 relative bg-[#5F799A] flex items-center justify-center p-6 overflow-hidden">
      <FloatingPaws />
      <div className="text-center z-10">
        <h1 className="text-2xl font-bold text-white mb-2">{heading}</h1>
        <p className="text-sm text-white mb-4">{subheading}</p>
        <button className="px-4 py-2 bg-white border border-[#707f93] text-[#5F799A] rounded hover:bg-[#4c5c70] hover:text-white">
          <Link to={buttonLink} className="block w-full">
            {buttonText}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AuthIntro;
