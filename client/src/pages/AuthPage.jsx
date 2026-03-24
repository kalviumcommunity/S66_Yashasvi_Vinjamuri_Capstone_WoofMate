import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authIllustration from "../assets/auth_illustration.png";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname === "/login");

    useEffect(() => {
        setIsLogin(location.pathname === "/login");
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = formData;

        try {
            const url = isLogin
                ? "http://localhost:4545/login"
                : "http://localhost:4545/register";

            const payload = isLogin ? { email, password } : { name, email, password, role };

            const res = await axios.post(url, payload, {
                withCredentials: true,
            });

            toast.success(isLogin ? "Login successful!" : "Registration successful!");

            if (isLogin) {
                setTimeout(() => navigate("/"), 1500);
            } else {
                setTimeout(() => setIsLogin(true), 1500);
            }
        } catch (error) {
            const message = error.response?.data?.error || error.response?.data?.message || "Something went wrong.";
            toast.error(message);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-50 flex overflow-hidden relative font-sans">
            <ToastContainer position="top-right" autoClose={2000} />

            {/* Sliding Image Panel */}
            <div
                className={`absolute top-0 w-1/2 h-full z-20 transition-transform duration-700 ease-in-out bg-cover bg-center shadow-2xl ${isLogin ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ backgroundImage: `url(${authIllustration})` }}
            >
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-12 text-center">
                    <h2 className="text-4xl font-bold mb-4 drop-shadow-md">
                        {isLogin ? "Welcome Back!" : "Join Our Pack"}
                    </h2>
                    <p className="text-lg drop-shadow-md">
                        {isLogin
                            ? "Login to continue your journey and find your perfect furry companion."
                            : "Create an account to connect with shelters, adopters, and dogs."}
                    </p>
                </div>
            </div>

            {/* Forms Container */}
            <div className="w-full flex h-full">
                {/* Signup Form Side (Left) */}
                <div className={`w-1/2 h-full flex items-center justify-center p-12 transition-opacity duration-700 ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                        <p className="text-gray-500 mb-8">Join the WoofMate community today.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required={!isLogin} />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" type="email" id="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                                <select className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" id="role" value={formData.role} onChange={handleChange}>
                                    <option value="user">Adopter (User)</option>
                                    <option value="rescue">Rescue/Shelter</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full block bg-[#5F799A] hover:bg-[#4a5f78] text-white font-semibold rounded-lg px-4 py-3 mt-6 transition-colors shadow-md">Sign Up</button>
                        </form>

                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <a
                            href="http://localhost:4545/auth/google"
                            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 bg-white transition-all duration-300 shadow-sm hover:shadow-md mb-2 hover:border-[#5F799A] group"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google logo"
                                className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
                            />
                            <span className="font-semibold text-gray-800">Sign up with Google</span>
                        </a>
                        <p className="mt-8 text-gray-600 text-center">
                            Already have an account? <span className="text-[#5F799A] cursor-pointer font-semibold hover:underline" onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </div>
                </div>

                {/* Login Form Side (Right) */}
                <div className={`w-1/2 h-full flex items-center justify-center p-12 transition-opacity duration-700 ${isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" type="email" id="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors" type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="w-full block bg-[#5F799A] hover:bg-[#4a5f78] text-white font-semibold rounded-lg px-4 py-3 mt-6 transition-colors shadow-md">Log In</button>
                        </form>

                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <a
                            href="http://localhost:4545/auth/google"
                            className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 bg-white transition-all duration-300 shadow-sm hover:shadow-md mb-2 hover:border-[#5F799A] group"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google logo"
                                className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform"
                            />
                            <span className="font-semibold text-gray-800">Sign in with Google</span>
                        </a>
                        <p className="mt-8 text-gray-600 text-center">
                            Don't have an account? <span className="text-[#5F799A] cursor-pointer font-semibold hover:underline" onClick={() => navigate('/signup')}>Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
