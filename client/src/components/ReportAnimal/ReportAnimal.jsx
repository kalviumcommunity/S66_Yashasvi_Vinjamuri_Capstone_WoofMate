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
    try {
      // In a real app we'd convert files to Base64 or FormData to upload to Cloudinary. 
      // For this implementation, we map the text fields to match the reportRescue schema.
      const payload = {
        reporter: "64e0f9b3e6d2b638f4d9c0a1", // Placeholder objectID for unauthenticated guest, or we would get it from Context
        location: formData.dogLocation,
        description: formData.description + " | Condition: " + formData.dogCondition + " | Address: " + formData.address,
        image: "" // Placeholder blank
      };

      await axios.post(`${API_BASE_URL}/api/rescue`, payload);
      toast.success("Report submitted successfully! Thank you for helping.");
      setFormData({
        name: "", phone: "", dogCondition: "", conditionType: "", email: "", dogLocation: "", address: "", description: ""
      });
      setSelectedFiles([]);
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
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
