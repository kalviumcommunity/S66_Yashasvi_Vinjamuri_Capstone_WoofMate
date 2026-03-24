import React, { useState, useEffect } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { BookOpen, AlertCircle, Loader2 } from "lucide-react";

const StarterGuide = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/guides`);
                if (response.data && response.data.guides) {
                    setGuides(response.data.guides);
                }
            } catch (err) {
                console.error("Error fetching guides:", err);
                setError("Failed to load guides. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
                        <BookOpen className="text-indigo-600" size={40} />
                        Dog Starter Guides
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about welcoming a new furry friend into your home, from health to lifestyle.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                        <span className="ml-3 text-lg text-gray-600">Loading guides...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                        <AlertCircle size={48} className="mb-4 text-red-500" />
                        <p className="text-lg">{error}</p>
                    </div>
                ) : guides.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                        <h3 className="text-2xl font-medium text-gray-800">No guides found</h3>
                        <p className="text-gray-500 mt-2">Check back soon for new educational content!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {guides.map((guide) => (
                            <div key={guide._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                                <div className="bg-indigo-600 px-6 py-2">
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">{guide.category}</span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                                    <div className="prose prose-sm text-gray-600 flex-grow" dangerouslySetInnerHTML={{ __html: guide.content }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default StarterGuide;
