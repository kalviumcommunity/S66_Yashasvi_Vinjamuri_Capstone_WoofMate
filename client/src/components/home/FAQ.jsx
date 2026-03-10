import React, { useState } from "react";

const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: "How to find which dog is best for me?",
      answer:
        'There is a personalized quiz designed to match you with the most suitable dog breed based on your available facilities, and other parameters',
      open: false,
    },
    {
      question: "How do I take care of the dog once I adopt it ",
      answer:
        'There are many blogs that help you understand everything about their behaviour, how to take care of them, diet they need ....',
      open: false,
    },
    {
      question: "How do I contact the owner of the dog I like",
      answer:
        'You can directly chat with the owner from inbuilt chat application, schedule a call or join in on a video call.',
      open: false,
    },
    {
      question: "What is the use of Rescue port",
      answer:
        'It is when you find a street dog or any injured dog, you can report and a rescue team is gonna come to take them in for a dog shelter and treat them and further can be adopted through this website',
      open: false,
    },
  ]);

  const toggleFaq = (index) => {
    setFaq(
      faq.map((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }

        return item;
      })
    );
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Here are a few questions you could possibly looking answers for
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faq.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleFaq(index)}
              >
                <span className="flex text-lg font-semibold text-black">
                  {" "}
                  {item.question}{" "}
                </span>

                <svg
                  className={`w-6 h-6 text-gray-400 ${
                    item.open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`${
                  item.open ? "block" : "hidden"
                } px-4 pb-5 sm:px-6 sm:pb-6`}
              >
                <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
