import React from "react";
import Navbar from "../components/home/Navbar";
import Intro from "../components/home/Intro";
import Features from "../components/home/Features";
import Carousel from "../components/home/Carousel";
import Nearby from "../components/home/Nearby";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";
import HowItWorks from "../components/home/HowItWorks";
import Faq from "../components/home/FAQ";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Intro />
      <Features />
      <HowItWorks />
      <Carousel />
      <Nearby />
      <Statistics />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
