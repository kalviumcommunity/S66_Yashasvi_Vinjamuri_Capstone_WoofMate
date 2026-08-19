import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <>
      {/* Fixed background hero with Blob Theme */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-white overflow-hidden" style={{ zIndex: 0 }}>

        {/* Animated Monochrome Blobs */}
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Blob 1 */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5F5BD7] rounded-full blur-[120px]"
          />
          {/* Blob 2 */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -60, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#5F5BD7] rounded-full blur-[140px]"
          />
          {/* Blob 3 */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 40, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#5F5BD7] rounded-full blur-[110px]"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-8 z-10 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gray-900 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Find your <span className="bg-gradient-to-r from-[#5F5BD7] to-[#827FFE] bg-clip-text text-transparent underline decoration-[#5F5BD7]/10 underline-offset-8">purfect</span> <br />
              companion today
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 text-lg sm:text-xl md:text-2xl max-w-2xl font-medium leading-relaxed"
          >
            Be ready for chaos, cuddles, and unconditional love.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link to="/quiz">
              <button
                className="w-full sm:w-auto bg-[#5F5BD7] hover:bg-[#4E4AB5] text-black px-10 py-5 rounded-[2rem] text-lg sm:text-xl font-black transition-all shadow-[0_15px_40px_rgba(95,91,215,0.4)] hover:shadow-[0_20px_50px_rgba(95,91,215,0.6)] active:scale-95 flex items-center justify-center gap-2 group"
              >
                Take Personalized Quiz
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
            <Link to="/adopt">
              <button className="w-full sm:w-auto bg-transparent border-4 border-[#5F5BD7] text-[#5F5BD7] hover:bg-[#black] hover:text-black px-10 py-5 rounded-[2rem] text-lg sm:text-xl font-black transition-all active:scale-95 shadow-lg">
                Adopt Now
              </button>
            </Link>
          </div>

          <p className="text-[#5F5BD7] text-sm sm:text-base font-black tracking-[0.2em] uppercase mt-4">
            ✨ Get personalized dog suggestions by taking our AI Quiz
          </p>
        </div>
      </div>

      {/* Spacer to push content below the fixed hero */}
      <div style={{ height: '520px' }} />
    </>
  );
};

export default Intro;
