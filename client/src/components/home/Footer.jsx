import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-[#3C2A4D] px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
        {/* Brand Info */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-[#735D78] tracking-wide">
            WoofMate
          </h1>
          <p className="mt-4 text-sm leading-relaxed">
            WoofMate connects loving homes with dogs in need of adoption. Our
            mission is to reduce the number of dogs in shelters and increase the
            number of happy, healthy dogs in forever homes.
          </p>
          <div className="flex gap-4 mt-6 text-[#B392AC] text-2xl">
            <FaFacebookF className="hover:text-[#735D78] cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-[#735D78] cursor-pointer transition" />
            <FaYoutube className="hover:text-[#735D78] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#735D78] cursor-pointer transition" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
          <div>
            <h3 className="font-semibold text-[#735D78] text-base mb-3">
              Adoption
            </h3>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Find a Dog</li>
              <li className="hover:underline cursor-pointer">Process</li>
              <li className="hover:underline cursor-pointer">
                Success Stories
              </li>
              <li className="hover:underline cursor-pointer">Resources</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#735D78] text-base mb-3">
              Services
            </h3>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Dog Walking</li>
              <li className="hover:underline cursor-pointer">Grooming</li>
              <li className="hover:underline cursor-pointer">Veterinary</li>
              <li className="hover:underline cursor-pointer">Training</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#735D78] text-base mb-3">
              Get Involved
            </h3>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Donate</li>
              <li className="hover:underline cursor-pointer">Volunteer</li>
              <li className="hover:underline cursor-pointer">Report a Dog</li>
              <li className="hover:underline cursor-pointer">Foster Program</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#D1B3C4] mt-12 pt-6 text-xs text-center sm:text-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <p>© 2025 WoofMate. All rights reserved.</p>
        <ul className="flex gap-4">
          <li className="hover:underline cursor-pointer">Privacy</li>
          <li className="hover:underline cursor-pointer">Terms</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
        <p>Made with 🐾 for dogs</p>
      </div>
    </footer>
  );
};

export default Footer;
