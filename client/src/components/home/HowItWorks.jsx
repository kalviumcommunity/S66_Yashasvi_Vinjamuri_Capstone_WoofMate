import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animate the path length for the progress line
  const pathLength = smoothProgress;

  // Highlights for the numbers
  const step1Active = useTransform(smoothProgress, [0, 0.33], [0.1, 1]);
  const step2Active = useTransform(smoothProgress, [0.33, 0.66], [0.1, 1]);
  const step3Active = useTransform(smoothProgress, [0.66, 1], [0.1, 1]);

  const steps = [
    {
      number: 1,
      title: "Take the smart quiz",
      desc: "Attempt the smart quiz which collects your priorities, needs and amenities available to recommend you suitable dogs.",
      opacity: step1Active
    },
    {
      number: 2,
      title: "Talk to the owner",
      desc: "Schedule a call with your preferred dog guardian and get to know more about that dog's behavior and requirements.",
      opacity: step2Active
    },
    {
      number: 3,
      title: "Bring in your member",
      desc: "Visit the dog live, collect the basic kit, and take your new companion home to their forever family.",
      opacity: step3Active
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-white" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-24">
            <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              How does it work?
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-lg font-medium text-gray-500">
              A guided pathway to welcome a new member to your family
            </p>
          </div>

          <div className="relative">
            {/* The Animated Dotted Line Container */}
            <div className="absolute inset-x-0 hidden xl:px-44 top-10 md:block md:px-20 lg:px-28 z-0 pointer-events-none">
              <svg viewBox="0 0 1000 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
                {/* Background Dotted Line (Gray) */}
                <line 
                  x1="0" y1="10" x2="1000" y2="10" 
                  stroke="#E5E7EB" 
                  strokeWidth="4" 
                  strokeDasharray="8 12" 
                  strokeLinecap="round" 
                />
                {/* Animated Colored Line (Purple) */}
                <motion.line 
                  x1="0" y1="10" x2="1000" y2="10" 
                  stroke="#5F5BD7" 
                  strokeWidth="4" 
                  strokeDasharray="8 12" 
                  strokeLinecap="round" 
                  style={{ pathLength }}
                />
              </svg>
            </div>

            <div className="relative grid grid-cols-1 text-center gap-y-16 md:grid-cols-3 gap-x-12 z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div 
                    style={{ 
                        scale: step.opacity,
                        boxShadow: useTransform(step.opacity, [0.1, 1], [
                            "0px 0px 0px rgba(0,0,0,0)", 
                            "0px 10px 30px rgba(95, 91, 215, 0.4)"
                        ])
                    }}
                    className="flex items-center justify-center w-20 h-20 mx-auto bg-white border-4 border-gray-100 rounded-full transition-all"
                  >
                    <motion.span 
                      style={{ color: useTransform(step.opacity, [0.1, 1], ["#9CA3AF", "#5F5BD7"]) }}
                      className="text-3xl font-black"
                    > 
                        {step.number} 
                    </motion.span>
                  </motion.div>
                  
                  <motion.div style={{ opacity: step.opacity, y: useTransform(step.opacity, [0.1, 1], [20, 0]) }}>
                    <h3 className="mt-8 text-2xl font-black leading-tight text-gray-900 md:mt-12">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base text-gray-500 font-medium px-4">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {scrollYProgress.get() < 0.98 ? "Scroll to see the journey" : "Let's find your pup!"}
            </span>
            <div className="w-1 h-12 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    style={{ scaleY: pathLength, originY: 0 }}
                    className="w-full h-full bg-[#5F5BD7]"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
