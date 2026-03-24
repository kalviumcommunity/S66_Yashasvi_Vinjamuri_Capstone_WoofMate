import React, { useState } from "react";
import EmergencyNotice from "./EmergencyNotice";
import FormSection from "./FormSection";
import RescueProcess from "./RescueProcess";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportAnimal = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dogCondition: "",
    conditionType: "",
    email: "",
    dogLocation: "",
    address: "",
    description: "",
  });

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.description.length < 5) {
      toast.error("Please provide a more detailed description.");
      return;
    }

    try {
      // In a real app we'd convert files to Base64 or FormData to upload to Cloudinary. 
      const payload = {
        location: formData.dogLocation,
        description: `Condition: ${formData.dogCondition} | Address: ${formData.address} | Name: ${formData.name} | Phone: ${formData.phone} | Details: ${formData.description}`,
        image: "" // Placeholder blank
      };

      await axios.post(`${API_BASE_URL}/api/rescue`, payload, { withCredentials: true });
      toast.success("Report submitted successfully! Thank you for helping.");
      setFormData({
        name: "", phone: "", dogCondition: "", conditionType: "", email: "", dogLocation: "", address: "", description: ""
      });
      setSelectedFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit report. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Report an Animal in Need
        </h1>
        <p className="text-gray-600">
          Help us rescue dogs in dangerous or neglectful situations. Your report
          can save a life.
        </p>
      </div>

      <EmergencyNotice />
      <FormSection
        formData={formData}
        handleInputChange={handleInputChange}
        selectedFiles={selectedFiles}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      <RescueProcess />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ReportAnimal;
