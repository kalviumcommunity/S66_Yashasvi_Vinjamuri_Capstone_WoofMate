import React from "react";
import Navbar from "../components/home/Navbar";
import AuthIntro from "../components/auth/AuthIntro";
import AuthForm from "../components/auth/AuthForm";
import Footer from "../components/home/Footer";

const Signup = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div className="flex-grow flex justify-center items-center mt-10 px-4 mb-20">
      <div className="flex w-full max-w-screen-lg min-h-[600px] shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <AuthForm type="signup" />
        <AuthIntro
          heading="Join Our Pack"
          subheading="Create an account to find your perfect furry companion"
          buttonText="Login"
          buttonLink="/login"
        />
      </div>
    </div>
    <Footer />
  </div>
);

export default Signup;
