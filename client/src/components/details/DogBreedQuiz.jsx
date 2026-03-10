// DogBreedQuiz.js
import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import axios from "axios";

const DogBreedQuiz = () => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:4545/api/questions");
                setQuizQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    if (quizQuestions.length === 0) {
        return <div className="flex justify-center items-center h-screen bg-gray-50"><p className="text-xl">Loading Quiz...</p></div>;
    }

    const handleAnswerSelect = (key, value, isMultiSelect) => {
        setAnswers((prev) => {
            if (isMultiSelect) {
                const currentValues = prev[key] || [];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value];
                return { ...prev, [key]: newValues };
            } else {
                return { ...prev, [key]: value };
            }
        });
        if (!isMultiSelect && currentQuestionIndex < quizQuestions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
            }, 300);
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const calculateMatch = async () => {
        setIsCalculating(true);
        try {
            const response = await axios.post("http://localhost:4545/api/dogs/quiz", answers);
            if (response.data && response.data.matches) {
                setResults(response.data.matches);
            }
        } catch (error) {
            console.error("Error calculating match:", error);
        } finally {
            setIsCalculating(false);
        }
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progressPercentage =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const isCurrentQuestionAnswered = currentQuestion.allowMultiple
        ? answers[currentQuestion.key]?.length > 0
        : answers[currentQuestion.key] !== undefined;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Find Your Perfect Dog Breed
                </h2>

                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </p>
                </div>

                <QuizQuestion
                    key={currentQuestion.key}
                    questionData={currentQuestion}
                    answer={answers[currentQuestion.key]}
                    onSelect={handleAnswerSelect}
                />

                <div className="flex justify-between mt-8">
                    <button
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-2 rounded-lg ${currentQuestionIndex === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gray-600 hover:bg-gray-700 text-white"
                            }`}
                    >
                        Previous
                    </button>

                    {!isLastQuestion ? (
                        <button
                            onClick={goToNextQuestion}
                            disabled={!isCurrentQuestionAnswered}
                            className={`px-6 py-2 rounded-lg ${!isCurrentQuestionAnswered
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={calculateMatch}
                            disabled={!isCurrentQuestionAnswered || isCalculating}
                            className={`px-6 py-2 rounded-lg ${!isCurrentQuestionAnswered || isCalculating
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                        >
                            {isCalculating ? "Finding Your Match..." : "See Results"}
                        </button>
                    )}
                </div>

                {results && results.length > 0 && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Top Matches For You</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {results.map((dog) => (
                                <div key={dog._id} className="border rounded p-4 flex gap-4 items-center">
                                    <img src={dog.image?.[0] || 'https://via.placeholder.com/150'} alt={dog.name} className="w-20 h-20 object-cover rounded" />
                                    <div>
                                        <h4 className="font-bold text-lg">{dog.name}</h4>
                                        <p className="text-sm text-gray-600">{dog.breed} • {dog.age} • {dog.gender}</p>
                                        <p className="text-xs text-gray-500 mt-1">{dog.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DogBreedQuiz;
