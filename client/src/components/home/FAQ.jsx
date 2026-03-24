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
    <section className="relative z-10 py-16 bg-white sm:py-20 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
            Common Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-lg font-medium text-gray-500">
            Everything you need to know about finding your new best friend
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 space-y-5 md:mt-20">
          {faq.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-500 bg-white ${
                item.open ? "shadow-xl bg-[#5F5BD7]/[0.02] border-0" : "border-2 border-gray-100 hover:border-gray-200"
              } cursor-pointer rounded-2xl relative`}
            >
              <button
                type="button"
                className={`flex items-center justify-between w-full px-6 py-6 sm:p-8 transition-all hover:bg-gray-50/50 rounded-t-2xl ${!item.open ? "rounded-b-2xl" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <span className={`flex text-lg font-semibold text-left ${item.open ? "text-[#5F5BD7]" : "text-gray-900"}`}>
                  {item.question}
                </span>

                <div className={`p-2 rounded-full transition-colors ${item.open ? "bg-[#5F5BD7] text-white" : "bg-gray-50 text-gray-400"}`}>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
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
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`${
                  item.open ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                } px-8 transition-all duration-500 overflow-hidden rounded-b-2xl`}
              >
                <p className="text-gray-600 text-lg leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.answer }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
