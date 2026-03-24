import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <p className="text-amber-800 text-sm font-semibold flex items-center justify-center gap-2">
            <span className="text-lg">⚠️</span>
            Note: This application does not use real data and does not function in real as of now. This is a pure demo project.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Container with Glassmorphism */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl flex flex-col lg:flex-row justify-between gap-16 transition-all duration-500 hover:shadow-[#5F5BD7]/5">
          
          {/* Brand Info */}
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-[#5F5BD7] to-[#827FFE] bg-clip-text text-transparent">
              WoofMate
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed font-medium">
              Connecting loving hearts with paws in need. Our AI-powered matches 
              ensure every dog finds their perfect forever home, reducing shelter stays 
              and increasing happy tail wags.
            </p>
            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram].map((Icon, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-2xl text-[#5F5BD7] hover:bg-[#5F5BD7] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1">
                  <Icon className="text-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-base">
            <div>
              <h3 className="font-black text-gray-900 text-xl mb-6">Adoption</h3>
              <ul className="space-y-4 font-medium text-gray-500">
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Find a Dog</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">The Process</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Success Stories</li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-xl mb-6">Services</h3>
              <ul className="space-y-4 font-medium text-gray-500">
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Personalized Quiz</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Rescue Support</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Dog Training</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-black text-gray-900 text-xl mb-6">Community</h3>
              <ul className="space-y-4 font-medium text-gray-500">
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Donate</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Volunteer</li>
                <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Partner Shelters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer Credits */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 font-bold text-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2 bg-gray-50 rounded-lg">© 2025 WoofMate</span>
            <span>All rights reserved.</span>
          </div>
          <ul className="flex gap-8">
            <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Privacy</li>
            <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Terms</li>
            <li className="hover:text-[#5F5BD7] cursor-pointer transition-colors">Contact</li>
          </ul>
          <div className="flex items-center gap-2 group">
            <span>Made with</span>
            <span className="text-red-400 group-hover:scale-125 transition-transform duration-300">❤️</span>
            <span>for our furry friends</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
