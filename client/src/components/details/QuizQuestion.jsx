// QuizQuestion.js
import React from "react";

const QuizQuestion = ({ questionData, answer, onSelect }) => {
  const isSelected = (option) => {
    if (questionData.allowMultiple) {
      return answer?.includes(option);
    }
    return answer === option;
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {questionData.question}
      </h3>
      <div className="space-y-3">
        {questionData.options.map((option) => (
          <button
            key={option}
            onClick={() =>
              onSelect(questionData.key, option, questionData.allowMultiple)
            }
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              isSelected(option)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
