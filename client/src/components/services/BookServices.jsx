import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    service: "",
    contact: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Contact validation (10 digits)
    if (!/^\d{10}$/.test(form.contact)) {
      toast.error("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/service-bookings`, form, { withCredentials: true });
      setIsOpen(false);
      toast.success("Service booked successfully!");
      setForm({
        service: "",
        contact: "",
        date: "",
        time: "",
      });
    } catch (error) {
      toast.error("Failed to book service. Please try again.");
      console.error("Booking Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 text-black rounded-2xl font-bold shadow-[0_5px_0_#4E4AB5] hover:bg-indigo-700 active:translate-y-[2px] active:shadow-none transition-all duration-200"
        >
          Book Now
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg animate-modal-in">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              Book a Service
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Dog Grooming">Dog Grooming</option>
                  <option value="Veterinary Care">Veterinary Care</option>
                  <option value="Dog Walking">Dog Walking</option>
                  <option value="Doggy Daycare">Doggy Daycare</option>
                  <option value="Training Classes">Training Classes</option>
                  <option value="Nutrition Counselling">
                    Nutrition Counselling
                  </option>
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Info
                </label>
                <input
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-black py-4 rounded-2xl font-bold shadow-[0_5px_0_#4E4AB5] hover:bg-indigo-700 active:translate-y-[2px] active:shadow-none transition-all duration-200 mt-4"
              >
                Submit Booking
              </button>
            </form>
          </div>

          <style>
            {`
              @keyframes modalIn {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
              .animate-modal-in {
                animation: modalIn 0.3s ease-out forwards;
              }
            `}
          </style>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default BookServices;
