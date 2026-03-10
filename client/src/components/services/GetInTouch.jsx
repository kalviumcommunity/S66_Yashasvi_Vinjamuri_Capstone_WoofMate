import React from "react";
import { Link } from "react-router-dom";

const GetInTouch = () => {
  return (
    <div className=" py-12 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 rounded-2xl shadow-md p-6 md:p-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Need Custom Services?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            We understand that every dog is unique. Contact us to discuss
            customized care plans tailored specifically to your dog's needs and
            your schedule.
          </p>
          <Link to="/contact">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
              Get In Touch
            </button>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.equafleece.co.uk/public/cache/f55709743841f67067f662ee29b93ee3-JADZ7PB05A6Z2T3EE.jpg"
            alt="Dog care"
            className="w-full max-w-sm rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
