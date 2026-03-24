import React, { useState } from "react";
import {
  Heart,
  Shield,
  Utensils,
  Ambulance,
  GraduationCap,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonationPage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationAmount = amount === "custom" ? customAmount : amount;

    if (!donationAmount || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a mock donation record in the database
      await axios.post(`${API_BASE_URL}/api/donations/record-success`, {
        amount: donationAmount,
        status: "completed",
        paypalTransactionId: "MOCK_TRANSACTION_" + Math.random().toString(36).substring(7),
      }, { withCredentials: true });

      toast.success(`Thank you for your generous donation of $${donationAmount}! This is a demo transaction.`);
      setAmount("");
      setCustomAmount("");
    } catch (error) {
      toast.error("Failed to record donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Support Our Mission
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your generous donation helps us rescue, rehabilitate, and rehome the
          dogs in need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Donation Form */}
        <div className="bg-white rounded-xl shadow-md p-8 min-h-[600px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Donate for a cause (Demo)
          </h2>

          {/* Donation Type Toggle */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setDonationType("one-time")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
                donationType === "one-time"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              One-Time
            </button>
            <button
              type="button"
              onClick={() => setDonationType("monthly")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition ${
                donationType === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Donation Amount */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Donation Amount (USD)
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["10", "25", "50"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`py-3 px-4 border rounded-lg font-medium transition ${
                    amount === value
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="text-gray-400" size={20} />
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={amount === "custom" ? customAmount : ""}
                onChange={(e) => {
                  setAmount("custom");
                  setCustomAmount(e.target.value);
                }}
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Confirm your support
            </h3>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#5F5BD7] text-black py-4 rounded-2xl font-bold shadow-[0_5px_0_#4E4AB5] hover:bg-indigo-700 active:translate-y-[2px] active:shadow-none transition-all duration-200 mt-6 flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Processing..." : "Donate Now"}
            </button>
          </form>
          <ToastContainer position="top-center" autoClose={3000} />
          <p className="text-xs text-gray-400 mt-4 text-center">
            *This is a demo project. No actual payments will be processed.
          </p>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Where your donation goes
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: <Heart size={20} className="text-pink-600" />,
                  bg: "bg-pink-100",
                  title: "Shelter Operations",
                  desc: "Support our shelter facilities, utilities, and daily operations.",
                },
                {
                  icon: <Utensils size={20} className="text-yellow-600" />,
                  bg: "bg-yellow-100",
                  title: "Food & Supplies",
                  desc: "Help us provide quality food, toys, and comfort items for our dogs.",
                },
                {
                  icon: <Ambulance size={20} className="text-red-600" />,
                  bg: "bg-red-100",
                  title: "Rescue Operations",
                  desc: "Support our teams that rescue dogs from dangerous situations.",
                },
                {
                  icon: <GraduationCap size={20} className="text-green-600" />,
                  bg: "bg-green-100",
                  title: "Training Programs",
                  desc: "Help us train and rehabilitate dogs for successful adoptions.",
                },
                {
                  icon: <Shield size={20} className="text-purple-600" />,
                  bg: "bg-purple-100",
                  title: "General Fund",
                  desc: "Allow us to allocate funds where they're most needed at any time.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`${item.bg} p-2 rounded-full`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  amount: "$10",
                  desc: "Provides food for a dog for two weeks",
                },
                {
                  amount: "$25",
                  desc: "Covers basic vaccinations for one dog",
                },
                { amount: "$50", desc: "Sponsors a spay/neuter surgery" },
                {
                  amount: "$75",
                  desc: "Funds a rescue operation for a dog in danger",
                },
                {
                  amount: "$100",
                  desc: "Provides comprehensive medical care for a sick dog",
                },
                {
                  amount: "$250",
                  desc: "Supports our shelter operations for a full week",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"
                >
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">
                    {item.amount}
                  </h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
