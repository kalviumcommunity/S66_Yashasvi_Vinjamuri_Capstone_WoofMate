import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = ({ type }) => {
  const isLogin = type === "login";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const url = isLogin
        ? "http://localhost:4545/login"
        : "http://localhost:4545/register";

      const payload = isLogin ? { email, password } : { name, email, password };

      await axios.post(url, payload, {
        withCredentials: true,
      });

      toast.success(isLogin ? "Login successful!" : "Registration successful!");

      setTimeout(() => {
        navigate(isLogin ? "/" : "/login");
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-start py-10 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">
        {isLogin ? "Login to WoofMate" : "Create an account"}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        {isLogin
          ? "Enter your details to access your account"
          : "Join our growing community of dog lovers"}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-600 mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="input-style"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600 mb-1">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="input-style"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-600 mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="input-style"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <a
        href="http://localhost:4545/auth/google"
        className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 bg-white transition-all duration-300 shadow-sm hover:shadow-md mb-6 hover:border-[#5F799A] group"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
        />
        <span className="font-semibold text-gray-800">
          {isLogin ? "Sign in with Google" : "Sign up with Google"}
        </span>
      </a>

      <div className="text-center text-sm text-gray-500 pb-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Link to={isLogin ? "/signup" : "/login"}>
          <span className="text-[#5F799A] font-bold ml-1 hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </Link>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AuthForm;
