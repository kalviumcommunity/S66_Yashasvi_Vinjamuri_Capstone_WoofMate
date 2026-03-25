import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useNavigate } from "react-router-dom";

const DogCard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [dogs, setDogs] = useState([]);
  const [latestQuiz, setLatestQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dogsRes, quizRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/dogs`),
          axios.get(`${API_BASE_URL}/api/dogs/quiz/latest`, { withCredentials: true }).catch(() => null)
        ]);

        if (dogsRes.data && dogsRes.data.dogs) {
          setDogs(dogsRes.data.dogs);
        }
        if (quizRes && quizRes.data) {
          setLatestQuiz(quizRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  // Helper to check if dog is a best match
  const isBestMatch = (dogId) => {
    return latestQuiz?.recommendedDogs?.includes(dogId);
  };

  return (
    <div className="bg-white py-12 px-6 md:px-16 my-10 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-[#3C3C3C] mb-4">
          Find your Perfect Companion
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
          Browse our available dogs and filter by size, gender, and other traits
          to find your perfect match.
        </p>
      </div>

      <div className="relative mb-12 max-w-3xl mx-auto">
        <Search className="absolute top-1/2 left-5 transform -translate-y-1/2 text-[#AFAFAF]" />
        <input
          type="text"
          placeholder="Search for dogs by breed, gender, age..."
          className="w-full pl-14 pr-6 py-4 bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-2xl text-lg focus:outline-none focus:border-[#58CC02] transition-colors shadow-sm"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-10 mb-16">
        <div>
          <h3 className="text-[#AFAFAF] font-black uppercase tracking-widest text-sm mb-3 text-center md:text-left">Filter by Size</h3>
          <div className="flex gap-4">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                className={`px-6 py-2 rounded-xl font-bold border-2 transition-all ${selectedSize === size
                  ? "bg-[#58CC02] text-white border-[#46A302] translate-y-[2px] shadow-none"
                  : "bg-white text-[#4B4B4B] border-[#E5E5E5] hover:bg-[#F7F7F7] shadow-[0_3px_0_#E5E5E5]"
                  }`}
                onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#AFAFAF] font-black uppercase tracking-widest text-sm mb-3 text-center md:text-left">Filter by Gender</h3>
          <div className="flex gap-4">
            {["Male", "Female"].map((gender) => (
              <button
                key={gender}
                className={`px-6 py-2 rounded-xl font-bold border-2 transition-all ${selectedGender === gender
                  ? "bg-[#1899D6] text-white border-[#1580B3] translate-y-[2px] shadow-none"
                  : "bg-white text-[#4B4B4B] border-[#E5E5E5] hover:bg-[#F7F7F7] shadow-[0_3px_0_#E5E5E5]"
                  }`}
                onClick={() => setSelectedGender(gender === selectedGender ? "" : gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#58CC02]" />
        </div>
      ) : filteredDogs.length === 0 ? (
        <div className="text-center py-20 bg-[#F7F7F7] rounded-3xl border-2 border-dashed border-[#E5E5E5]">
          <p className="text-[#AFAFAF] text-xl font-bold">No dogs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDogs.map((dog) => {
            const matched = isBestMatch(dog._id);
            return (
              <div
                key={dog._id}
                onClick={() => navigate(`/adopt/${dog._id}`)}
                className={`flex flex-col bg-white border-2 rounded-3xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer ${matched ? 'border-[#58CC02] shadow-[0_8px_0_#46A302]' : 'border-[#E5E5E5] shadow-[0_5px_0_#E5E5E5]'
                  }`}
              >
                <div className="h-64 relative overflow-hidden group">
                  <img
                    src={dog.images?.[0] || 'https://via.placeholder.com/400'}
                    alt={dog.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {matched && (
                    <div className="absolute top-4 left-4 bg-[#58CC02] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                      ✨ Special Match
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-2xl text-xs font-black text-[#3C3C3C] flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#58CC02]"></span>
                    Available
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-black text-[#3C3C3C]">{dog.name}</h2>
                    <span className="text-[#1899D6] font-black text-sm uppercase tracking-tighter">
                      {dog.breed}
                    </span>
                  </div>

                  <div className="flex gap-3 text-[#AFAFAF] font-bold text-sm mb-4">
                    <span>{dog.age} Years</span>
                    <span>•</span>
                    <span>{dog.gender}</span>
                    <span>•</span>
                    <span>{dog.size}</span>
                  </div>

                  <p className="text-[#777] text-sm leading-relaxed mb-6 line-clamp-2">
                    {dog.qualities ? (typeof dog.qualities === 'string' ? dog.qualities : dog.qualities.join(", ")) : ""}
                  </p>

                  <div className="mt-auto pt-4 border-t-2 border-[#F7F7F7] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#AFAFAF] text-xs font-bold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {dog.location}
                    </div>
                    <button className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${matched ? 'bg-[#58CC02] text-white' : 'text-[#3C3C3C] hover:bg-[#F7F7F7]'
                      }`}>
                      Adopt Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DogCard;
