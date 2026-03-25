import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, MessageCircle, Heart, CheckCircle2, MapPin } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const DogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adopting, setAdopting] = useState(false);
  const [adoptStatus, setAdoptStatus] = useState("");

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dogs/${id}`);
        if (res.data && res.data.dog) {
          setDog(res.data.dog);
        }
      } catch (error) {
        console.error("Error fetching dog details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDog();
  }, [id]);

  const handleAdopt = async () => {
    setAdopting(true);
    setAdoptStatus("");
    try {
      // Mock adoption request - realistically requires auth token but we simulate success for demo
      await axios.post(`${API_BASE_URL}/api/dogs/${id}/adopt`, {}, { withCredentials: true });
      setAdoptStatus("success");
    } catch (error) {
      console.error("Adoption error:", error);
      // Even if it fails (not logged in), we mock success for the demo flow as requested
      setAdoptStatus("success");
    } finally {
      setAdopting(false);
    }
  };

  const handleChat = () => {
    navigate("/chat", { state: { shelterId: "64e0f9b3e6d2b638f4d9c0a2" } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex justify-center items-center py-20">
          <Loader2 className="w-16 h-16 animate-spin text-[#58CC02]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#E5E5E5] p-12 shadow-xl max-w-lg">
            <h2 className="text-3xl font-black text-[#FF4B4B] mb-4">Dog Not Found</h2>
            <p className="text-[#AFAFAF] text-lg font-bold mb-8">This dog may have already found their forever home.</p>
            <button onClick={() => navigate("/adopt")} className="bg-[#58CC02] text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-[#4ba803] transition-colors shadow-lg shadow-green-200">
              Browse Other Dogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <div className="py-12 px-6 md:px-16 w-full max-w-7xl mx-auto flex-grow">
        <button 
          onClick={() => navigate("/adopt")}
          className="flex items-center gap-2 text-[#AFAFAF] hover:text-[#3C3C3C] font-bold uppercase tracking-widest text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Catalog
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Image Section */}
          <div className="lg:w-1/2 relative bg-[#F7F7F7]">
            <img 
              src={dog.images?.[0] || 'https://via.placeholder.com/800'} 
              alt={dog.name} 
              className="w-full h-full object-cover min-h-[400px] lg:min-h-full"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-2xl text-sm font-black text-[#58CC02] flex items-center gap-2 shadow-lg">
              <span className="w-3 h-3 rounded-full bg-[#58CC02] animate-pulse"></span>
              Ready for Adoption
            </div>
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-2xl text-white flex items-center gap-2 shadow-lg">
              <MapPin size={20} className="text-[#58CC02]" />
              <span className="font-bold tracking-wide">{dog.location}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-5xl font-black text-[#3C3C3C] tracking-tight">{dog.name}</h1>
                <span className="bg-[#EAF5F9] text-[#1899D6] px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest border border-[#BDE0EF]">
                  {dog.breed}
                </span>
              </div>
              <p className="text-xl text-[#777] font-medium leading-relaxed">
                {dog.description}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#F7F7F7] p-4 rounded-2xl text-center border border-[#E5E5E5]">
                <p className="text-[#AFAFAF] text-xs font-black uppercase tracking-widest mb-1">Age</p>
                <p className="text-2xl font-black text-[#3C3C3C]">{dog.age} <span className="text-sm">Yrs</span></p>
              </div>
              <div className="bg-[#F7F7F7] p-4 rounded-2xl text-center border border-[#E5E5E5]">
                <p className="text-[#AFAFAF] text-xs font-black uppercase tracking-widest mb-1">Gender</p>
                <p className="text-xl font-black text-[#3C3C3C] capitalize mt-1">{dog.gender}</p>
              </div>
              <div className="bg-[#F7F7F7] p-4 rounded-2xl text-center border border-[#E5E5E5]">
                <p className="text-[#AFAFAF] text-xs font-black uppercase tracking-widest mb-1">Size</p>
                <p className="text-xl font-black text-[#3C3C3C] capitalize mt-1">{dog.size}</p>
              </div>
            </div>

            {/* In-depth Details */}
            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-[#3C3C3C] font-black tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#FFC800] rounded-full inline-block"></span> Qualities
                </h3>
                <p className="text-[#777] font-medium bg-[#FFFBEA] p-4 rounded-2xl border border-[#FFEBA1]">
                  {Array.isArray(dog.qualities) ? dog.qualities.join(", ") : dog.qualities}
                </p>
              </div>
              
              <div>
                <h3 className="text-[#3C3C3C] font-black tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#5F5BD7] rounded-full inline-block"></span> History
                </h3>
                <p className="text-[#777] font-medium bg-[#F1F0FF] p-4 rounded-2xl border border-[#D5D3F6]">
                  {dog.history}
                </p>
              </div>

              <div>
                <h3 className="text-[#3C3C3C] font-black tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#FF4B4B] rounded-full inline-block"></span> Specific Needs
                </h3>
                <p className="text-[#777] font-medium bg-[#FFF0F0] p-4 rounded-2xl border border-[#FFD5D5]">
                  {dog.specificNeeds || dog.specialNeeds || "No specific needs mentioned."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {adoptStatus === "success" ? (
              <div className="bg-[#E7F7DD] border-2 border-[#58CC02] rounded-2xl p-6 flex items-center gap-4 animate-in zoom-in duration-300">
                <div className="bg-[#58CC02] text-white p-3 rounded-full flex-shrink-0">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="text-[#46A302] font-black text-xl">Adoption Request Sent!</h4>
                  <p className="text-[#558a2f] font-medium mt-1">Our team will be in touch with you shortly regarding the next steps for {dog.name}.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={handleChat}
                  className="flex-1 bg-white border-2 border-[#1899D6] text-[#1899D6] hover:bg-[#EAF5F9] py-4 rounded-2xl font-black uppercase tracking-widest flex justify-center items-center gap-3 transition-colors shadow-sm"
                >
                  <MessageCircle size={22} />
                  Chat with Owner
                </button>
                <button 
                  onClick={handleAdopt}
                  disabled={adopting}
                  className="flex-1 bg-[#58CC02] hover:bg-[#4ba803] text-black py-4 rounded-2xl font-black uppercase tracking-widest flex justify-center items-center gap-3 transition-colors shadow-lg shadow-green-200 disabled:opacity-70"
                >
                  {adopting ? <Loader2 className="animate-spin" size={22} /> : <Heart size={22} />}
                  Adopt {dog.name}
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DogDetails;
