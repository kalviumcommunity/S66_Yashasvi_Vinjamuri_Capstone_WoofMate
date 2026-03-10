import React from "react";
import Navbar from "../components/home/Navbar";
import Intro from "../components/adopt/Intro";
import DogCard from "../components/adopt/DogCard";
import Footer from "../components/home/Footer";

const Adopt = () => {
  return (
    <div>
      <Navbar />
      <Intro />
      <DogCard />
      <Footer />
    </div>
  );
};

export default Adopt;
