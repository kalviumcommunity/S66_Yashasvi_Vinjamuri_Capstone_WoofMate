import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import axios from "axios";

const Intro = () => {
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get("http://localhost:4545/api/dogs");
        if (response.data && response.data.dogs) {
          setDogs(response.data.dogs);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDogs();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredDogs = dogs.filter((dog) => {
    const matchesSearch =
      (dog.name && dog.name.toLowerCase().includes(search.toLowerCase())) ||
      (dog.breed && dog.breed.toLowerCase().includes(search.toLowerCase())) ||
      (dog.age && dog.age.toString().toLowerCase().includes(search.toLowerCase())) ||
      (dog.gender && dog.gender.toLowerCase().includes(search.toLowerCase()));

    const matchesSize = selectedSize ? dog.size?.toLowerCase() === selectedSize.toLowerCase() : true;
    const matchesGender = selectedGender ? dog.gender?.toLowerCase() === selectedGender.toLowerCase() : true;

    return matchesSearch && matchesSize && matchesGender;
  });

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
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Size</h3>
          <div className="flex gap-4">
            {["Small", "Medium", "Large"].map((size) => (
              <div
                key={size}
                className={`px-4 py-2 border rounded-full cursor-pointer transition ${selectedSize === size
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-500"
                  }`}
                onClick={() =>
                  setSelectedSize(size === selectedSize ? "" : size)
                }
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
                className={`px-4 py-2 border rounded-full cursor-pointer transition ${selectedGender === gender
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-500"
                  }`}
                onClick={() =>
                  setSelectedGender(gender === selectedGender ? "" : gender)
                }
              >
                {gender}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtered Results */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : filteredDogs.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No dogs found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredDogs.map((dog) => (
            <div
              key={dog.name}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={dog.image}
                alt={dog.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold">{dog.name}</h2>
              <p className="text-gray-600">{dog.breed}</p>
              <p className="text-sm text-gray-500">
                {dog.age} • {dog.gender} • {dog.size}
              </p>
              <p className="text-sm mt-2 text-gray-700">
                {dog.qualities ? (typeof dog.qualities === 'string' ? dog.qualities : dog.qualities.join(", ")) : ""}
              </p>
              <p className="text-sm text-indigo-600 mt-1">{dog.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Intro;
