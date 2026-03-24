import React from "react";
import { MapPin } from "lucide-react";

const Nearby = () => {

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        alert("Location access granted!");
      },
      (error) => {
        console.error("Error getting location:", error);
        if (error.code === 1) {
          alert("Location permission denied.");
        } else if (error.code === 2) {
          alert("Location unavailable.");
        } else if (error.code === 3) {
          alert("Location request timed out.");
        }
      }
    );
  };
  return (
    <>
      <div className="w-[90%] mx-auto py-16 bg-white rounded-2xl shadow-md p-8 max-w-7xl text-center space-y-6 border border-gray-100 hover:shadow-lg transition">
        <div className="text-center mb-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="dog icon"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dog-Friendly Places Nearby
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover parks, cafes, and other places where you and your furry
            friend can have a great time together.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-xl text-center space-y-6 hover:shadow-md transition">
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="location icon"
                className="w-16 h-16"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Find Dog-Friendly Places
            </h2>
            <p className="text-gray-600">
              Allow location access to discover dog parks, pet stores, and other
              dog-friendly spots near you.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-[#735D78] text-white px-6 py-3 rounded-lg hover:bg-[#5d4762] transition"
              onClick={handleClick}
            >
              <MapPin size={20} />
              Use My Location
            </button>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Nearby;
