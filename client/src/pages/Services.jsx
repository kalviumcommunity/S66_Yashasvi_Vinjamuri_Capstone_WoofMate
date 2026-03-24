import React from "react";
import Navbar from "../components/home/Navbar";
import ServiceCard from "../components/services/ServiceCard";
import Footer from "../components/home/Footer";
import GetInTouch from "../components/services/GetInTouch";
import BookServices from "../components/services/BookServices";
import Faq from "../components/home/FAQ";

const Services = () => {
  return (
    <div>
      <Navbar />
      <ServiceCard/>
      <BookServices/>
      <GetInTouch/>
      <Faq/>
      <Footer/>
    </div>
  );
};

export default Services;
