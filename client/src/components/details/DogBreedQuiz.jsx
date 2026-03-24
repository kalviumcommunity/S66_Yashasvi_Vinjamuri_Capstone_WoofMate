// DogBreedQuiz.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { motion, AnimatePresence } from "framer-motion";

const mascotImg = "/mascot.png";

const DogBreedQuiz = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [visibleQuestions, setVisibleQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [summary, setSummary] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [cheerMessage, setCheerMessage] = useState("Which woof fits you best? Let's find out!");

    // Expanded Dialogue Engine Mapping
    const mascotDialogues = {
        firstTimeOwner: {
            "Yes": "Oh really? Your life needs some pawrification then! Let's find your first best friend.",
            "No": "Oh, you're a paw-parent already! That's wonderful. Experience counts!"
        },
        foodKnowledge: {
            "Yes, I'm well researched!": "Knowledge is power! A healthy pup is a happy pup.",
            "I need some guidance": "Don't worry, I'm a gourmet expert! We'll learn together.",
            "I'm not sure": "Honesty is the first step to being a great paw-parent! We'll handle it."
        },
        livingSituation: {
            "Apartment": "Cozy living! We'll look for someone who loves to snuggle inside.",
            "House with small yard": "Nice and manageable! Perfect for a balanced companion.",
            "House with large yard": "A backyard kingdom! Room for a big, energetic friend.",
            "Rural/Farm": "The great outdoors! A working dog would be in heaven here."
        },
        activityLevel: {
            "Couch potato": "Relatable! I like naps too. Let's find a champion chiller.",
            "Occasional walks": "Perfect balance. A moderately active friend would be grand.",
            "Daily jogs/runs": "An athlete! You need a high-energy partner to keep up.",
            "High-intensity hiking/sports": "Wow! You're basically a superhero. You need an elite adventurer."
        },
        hasChildren: {
            "Babies/Toddlers": "Tiny humans! We'll find a gentle, patient soul for your family.",
            "Middle schoolers": "Playmates! A fun-loving dog would be their best friend.",
            "Teens": "Awesome! A sturdy buddy for those teenage adventures.",
            "No children": "Peace and quiet. Perfect for any kind of furry companion!"
        },
        otherPets: {
            "Dogs": "A sibling! Social butterflies only for your pack.",
            "Cats": "The classic rivals? We'll find someone who speaks 'meow' fluently.",
            "Small animals": "Gentle paws needed. We'll look for low-prey drive friends.",
            "No other pets": "The center of attention! Just the way some pups like it."
        },
        groomingTime: {
            "Minimal": "Low maintenance, high love! That's my kind of style.",
            "Weekly brushing": "A little spa day once a week. Sounds relaxing!",
            "Professonal grooming needed": "Fancy! We'll find you a dog with a fabulous coat."
        },
        preferredSize: {
            "Toy/Extra Small": "A pocket-sized companion! Easy to take everywhere.",
            "Small": "A sturdy little friend. Perfect for laps and laps around the park.",
            "Medium": "The Goldilocks choice! Not too big, not too small—just right.",
            "Large": "A gentle giant! More of them to love and hug.",
            "Giant": "Absolute legends! Like owning a small, furry pony."
        },
        trainingTime: {
            "I want a pre-trained dog": "A wise choice. Sometimes an old dog with new tricks is best!",
            "A little bit each day": "Consistency is key! You'll build an amazing bond.",
            "I love intensive training": "A professor of paws! You need a highly intelligent partner."
        },
        biggestConcern: {
            "Barking": "Quiet as a mouse. We'll find a peaceful companion.",
            "Shedding": "A lint-roller-free life! Hypoallergenic friends coming up.",
            "Energy levels": "Matching the vibe is crucial. We'll find your energy twin.",
            "Cost": "Budget-friendly besties! We'll consider long-term care needs.",
            "None": "You're ready for anything! Let's find the ultimate match."
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/questions`);
                setAllQuestions(response.data);
                setVisibleQuestions(response.data.filter(q => !q.dependsOn));
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        const newlyVisible = allQuestions.filter(q => {
            if (!q.dependsOn) return true;
            return answers[q.dependsOn.key] === q.dependsOn.value;
        });
        setVisibleQuestions(newlyVisible);
    }, [answers, allQuestions]);

    if (visibleQuestions.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#F8F9FA]">
                <p className="text-xl font-bold text-[#5F5BD7]">Finding the right questions for you</p>
            </div>
        );
    }

    const handleAnswerSelect = (key, value) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);

        // Update Mascot Dialogue
        if (mascotDialogues[key] && mascotDialogues[key][value]) {
            setCheerMessage(mascotDialogues[key][value]);
        }

        // Calculate if we need to advance, considering potentially new questions
        const nextVisibleQuestions = allQuestions.filter(q => {
            if (!q.dependsOn) return true;
            return newAnswers[q.dependsOn.key] === q.dependsOn.value;
        });

        if (currentQuestionIndex < nextVisibleQuestions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 800);
        }
    };

    const nextStep = () => {
        if (currentQuestionIndex < visibleQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
    };

    const calculateMatch = async () => {
        setIsCalculating(true);
        setCheerMessage("Wait a sec... I'm looking for matches for you!");
        try {
            const response = await axios.post(`${API_BASE_URL}/api/dogs/quiz/ai`, answers, { withCredentials: true });
            console.log("AI Quiz Response:", response.data);
            if (response.data) {
                setResults(response.data.matches);
                setIsSaved(response.data.saved);
                // Ensure we ALWAYS have a summary from backend, but fallback just in case
                setSummary(response.data.summary || "You're clearly a paw-loving soul! Based on your lifestyle, we've found dogs that align with your energy and home setup perfectly.");
                setCheerMessage(response.data.saved
                    ? "Success! Your results are saved to your profile. Let's see your matches!"
                    : "Your future dog looks very interesting! Let's take a look.");
            }
        } catch (error) {
            console.error("Error calculating match:", error);
            setCheerMessage("Oops! I hit a little snag. Give it another try!");
        } finally {
            setIsCalculating(false);
        }
    };

    const currentQuestion = visibleQuestions[currentQuestionIndex];
    const progressPercentage = visibleQuestions.length > 0
        ? ((currentQuestionIndex + 1) / visibleQuestions.length) * 100
        : 0;

    // Safety check: Only show loading screen if we truly have no questions to show yet
    if (!results && !isCalculating && visibleQuestions.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <p className="text-xl font-bold text-[#5F5BD7]">Finding the right questions for you...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-['Inter', sans-serif]">

            {/* Left Side: Gradient Banner & Mascot - Modern Polish */}
            <div className="w-full md:w-5/12 bg-gradient-to-br from-[#4A47D0] via-[#5F5BD7] to-[#827FFE] p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-black/10 rounded-full blur-[80px]" />

                <div className="z-10">
                    <Link to="/" className="flex items-center gap-2 text-white mb-8 group cursor-pointer no-underline">
                        <span className="text-2xl font-black tracking-tighter group-hover:opacity-80 transition-opacity">WoofMate</span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center z-10">
                    <div className="max-w-xs w-full flex flex-col items-center">
                        <div className="min-h-[160px] w-full flex items-center justify-center mb-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={cheerMessage}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, y: -10 }}
                                    className="bg-white/15 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-xl w-full"
                                >
                                    <p className="text-white text-xl font-bold leading-snug tracking-tight text-center">
                                        {cheerMessage}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            src={mascotImg}
                            alt="Mascot"
                            className="w-56 h-56 object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Right Side: Quiz Content - High Readability Modern Style */}
            <div className="w-full md:w-7/12 p-8 md:p-20 flex flex-col bg-[#FCFCFD]">
                {!results ? (
                    <div className="max-w-xl w-full mx-auto flex-1 flex flex-col">
                        {/* Progress Header */}
                        <div className="mb-14">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[#A0AEC0] font-black text-xs uppercase tracking-[0.2em]">Match Progress</span>
                                <span className="text-[#5F5BD7] font-black text-sm">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full h-2 bg-[#EDF2F7] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    className="h-full bg-gradient-to-r from-[#5F5BD7] to-[#827FFE]"
                                />
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestionIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-[2.5rem] font-black text-[#1A202C] mb-4 leading-[1.1] tracking-tight">
                                        {currentQuestion?.question}
                                    </h2>
                                    <p className="text-[#718096] text-xl mb-12 font-medium">
                                        Please choose one for now - you can always adjust this later.
                                    </p>

                                    <QuizQuestion
                                        questionData={currentQuestion}
                                        answer={answers[currentQuestion?.key]}
                                        onSelect={handleAnswerSelect}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Controls - Minimalist */}
                        <div className="mt-12 flex items-center justify-between pt-10">
                            <button
                                onClick={prevStep}
                                disabled={currentQuestionIndex === 0}
                                className={`flex items-center gap-2 font-black text-sm uppercase tracking-widest px-8 py-5 rounded-2xl transition-all ${currentQuestionIndex === 0 ? 'text-[#CBD5E0] cursor-not-allowed' : 'text-[#4A5568] hover:bg-[#F7FAFC] active:scale-95'
                                    }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                Back
                            </button>

                            {(currentQuestionIndex === visibleQuestions.length - 1 || isCalculating) && answers[currentQuestion?.key] && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    onClick={calculateMatch}
                                    disabled={isCalculating}
                                    style={{ backgroundColor: '#5F5BD7', color: '#FFFFFF' }}
                                    className="!bg-[#5F5BD7] hover:!bg-[#4E4AB5] !text-white font-black px-12 py-5 rounded-2xl shadow-[0_15px_35px_-10px_rgba(95,91,215,0.4)] transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-sm"
                                >
                                    {isCalculating ? "Matching..." : "Get Results"}
                                    {!isCalculating && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                                </motion.button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl w-full mx-auto h-full flex flex-col justify-center">
                        {/* Results UI - Single Card Modern Style (Non-scrollable) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3.5rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-[#EDF2F7] relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-10 text-5xl opacity-10 pointer-events-none">✨</div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#5F5BD7]/5 rounded-full blur-3xl pointer-events-none" />

                            <h2 className="text-4xl font-black text-[#1A202C] mb-10 leading-tight tracking-tight">Your Match Profile</h2>

                            {isSaved && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-[#58CC02]/10 border border-[#58CC02]/20 rounded-2xl flex items-center gap-3 text-[#46A302] font-bold text-sm"
                                >
                                    <div className="w-6 h-6 bg-[#58CC02] rounded-full flex items-center justify-center text-white text-xs">✓</div>
                                    Quiz results saved successfully to your profile!
                                </motion.div>
                            )}

                            <div className="space-y-10">
                                <div className="p-10 bg-[#FAF9FF] rounded-[2.5rem] border-2 border-[#5F5BD7]/5 relative transition-all hover:bg-white hover:shadow-xl hover:border-[#5F5BD7]/10">
                                    <h4 className="text-[#5F5BD7] font-black uppercase text-[11px] tracking-[0.4em] mb-5">AI Analysis Result</h4>
                                    <p className="text-2xl font-bold leading-relaxed text-[#2D3748] italic">
                                        "{summary}"
                                    </p>
                                </div>

                                <div className="p-10 bg-[#F7FAFC] rounded-[2.5rem] border-2 border-[#EDF2F7]/50 flex items-start gap-6 transition-all hover:bg-white hover:shadow-xl hover:border-[#5F5BD7]/10">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0 border border-[#EDF2F7]">✨</div>
                                    <div>
                                        <h4 className="text-[#A0AEC0] font-black uppercase text-[11px] tracking-[0.4em] mb-3">Recommendation Tip</h4>
                                        <p className="text-[#4A5568] font-bold leading-relaxed">
                                            Look for the <span className="text-2xl inline-block align-middle mt-[-4px]">✨</span> star on dog profiles in our gallery—it marks your perfect lifestyle matches!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-14 flex flex-col sm:flex-row gap-5">
                                <button
                                    onClick={() => window.location.href = '/adopt'}
                                    className="flex-[2] !bg-[#5F5BD7] hover:!bg-[#4E4AB5] !text-white font-black py-7 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(95,91,215,0.3)] transition-all active:scale-95 text-center uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
                                >
                                    Explore Matches
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex-1 !bg-[#F7FAFC] hover:!bg-[#EDF2F7] !text-[#4A5568] font-black py-7 rounded-[2rem] border-2 border-transparent hover:border-[#EDF2F7] transition-all active:scale-95 text-center uppercase tracking-[0.2em] text-xs"
                                >
                                    Re-Quiz
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DogBreedQuiz;
