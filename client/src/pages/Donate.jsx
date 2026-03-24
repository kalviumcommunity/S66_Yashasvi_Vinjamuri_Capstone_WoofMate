import React from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import DonationPage from "../components/donate/DonationPage";

const Donate = () => {
  return (
    <div>
      <Navbar />
      <DonationPage/>
      <Footer/>
    </div>
  );
};

export default Donate;
