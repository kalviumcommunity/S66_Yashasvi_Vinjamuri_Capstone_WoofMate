// QuizQuestion.js
import React from "react";
import { motion } from "framer-motion";

const QuizQuestion = ({ questionData, answer, onSelect }) => {
  const isSelected = (option) => {
    if (questionData.allowMultiple) {
      return answer?.includes(option);
    }
    return answer === option;
  };

  if (!questionData || !questionData.options) {
    return null; // Or a loading spinner
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {questionData.options.map((option) => (
        <motion.button
          key={option}
          whileHover={{ x: 8 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(questionData.key, option)}
          className={`w-full text-left p-7 rounded-[2rem] border-2 transition-all flex items-center justify-between group !bg-white ${isSelected(option)
            ? "border-[#5F5BD7] text-[#5F5BD7] shadow-[0_12px_30px_-10px_rgba(95,91,215,0.2)]"
            : "border-[#F0F2F5] hover:border-[#5F5BD7]/30 text-[#4A5568] shadow-sm"
            }`}
        >
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold tracking-tight">{option}</span>
          </div>

          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected(option) ? 'bg-[#5F5BD7] border-[#5F5BD7]' : 'border-[#E2E8F0] group-hover:border-[#5F5BD7]'
            }`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSelected(option) ? "white" : "transparent"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default QuizQuestion;
