import React, { useState } from "react";
import {
  Heart,
  Shield,
  Utensils,
  Ambulance,
  GraduationCap,
  DollarSign,
} from "lucide-react";

const DonationPage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationAmount = amount === "custom" ? customAmount : amount;
    console.log({
      type: donationType,
      amount: donationAmount,
      ...formData,
    });
    alert(`Thank you for your donation of $${donationAmount}!`);
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
            Donate for a cause
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
              Donation Amount
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["50", "100", "200"].map((value) => (
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
            <h3 className="text-lg font-medium text-gray-800">
              Your information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="your.email@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg mt-6"
            >
              Donate Now
            </button>
          </form>
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
                  amount: "₹800",
                  desc: "Provides food for a dog for two weeks",
                },
                {
                  amount: "₹1200",
                  desc: "Covers basic vaccinations for one dog",
                },
                { amount: "₹1500", desc: "Sponsors a spay/neuter surgery" },
                {
                  amount: "₹2000",
                  desc: "Funds a rescue operation for a dog in danger",
                },
                {
                  amount: "₹2500",
                  desc: "Provides comprehensive medical care for a sick dog",
                },
                {
                  amount: "₹5000",
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
