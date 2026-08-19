import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import Navbar from './home/Navbar';
import Footer from './home/Footer';
import { Loader2, User, PawPrint, AlertCircle, Calendar, CalendarCheck, LogOut, Trophy } from 'lucide-react';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [adoptions, setAdoptions] = useState([]);
    const [rescues, setRescues] = useState([]);
    const [services, setServices] = useState([]);
    const [quizAttempt, setQuizAttempt] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (currentUser) {
                    const [adoptRes, rescueRes, servicesRes, quizRes] = await Promise.allSettled([
                        axios.get(`${API_BASE_URL}/api/adoptions/user/${currentUser._id}`, { withCredentials: true }),
                        axios.get(`${API_BASE_URL}/api/rescue/user/${currentUser._id}`),
                        axios.get(`${API_BASE_URL}/api/service-bookings/my-bookings`, { withCredentials: true }),
                        axios.get(`${API_BASE_URL}/api/dogs/quiz/latest`, { withCredentials: true })
                    ]);
                    if (adoptRes.status === 'fulfilled') setAdoptions(adoptRes.value.data);
                    if (rescueRes.status === 'fulfilled') setRescues(rescueRes.value.data);
                    if (servicesRes.status === 'fulfilled') setServices(servicesRes.value.data);
                    if (quizRes.status === 'fulfilled' && quizRes.value.data) setQuizAttempt(quizRes.value.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [currentUser]);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    if(loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <Loader2 className="animate-spin text-[#58CC02] w-12 h-12" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-6 mb-10">
                    <div className="w-24 h-24 bg-[#5F5BD7] rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-indigo-200">
                        {currentUser?.name?.charAt(0).toUpperCase() || <User />}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-black text-[#3C3C3C]">{currentUser?.name}</h1>
                        <p className="text-[#AFAFAF] font-medium text-lg">{currentUser?.email}</p>
                        <div className="inline-block mt-2 bg-[#F8F9FE] text-[#5F5BD7] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-indigo-50">
                            {currentUser?.role || 'Adopter'}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        <span>Log out</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Latest Quiz Recommendations */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 md:col-span-2">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-[#F1FBEA] text-[#58CC02] rounded-2xl">
                                    <Trophy size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#3C3C3C]">Your Dog Matches</h2>
                                    <p className="text-sm font-medium text-[#AFAFAF]">Your latest quiz results, ranked by compatibility</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => navigate('/quiz')} className="rounded-xl border-2 border-[#E5E5E5] px-4 py-2 text-sm font-black text-[#5F5BD7] hover:bg-[#F8F9FE]">
                                Retake quiz
                            </button>
                        </div>

                        {quizAttempt?.recommendedMatches?.length ? (
                            <div className="space-y-4">
                                {quizAttempt.recommendedMatches.map((match, index) => (
                                    <div key={match.dog?._id || index} className="flex flex-col gap-4 rounded-2xl border border-[#E5E5E5] bg-[#F8F9FE] p-4 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-4 sm:flex-1">
                                            <span className="w-8 text-center text-xl font-black text-[#AFAFAF]">{index + 1}</span>
                                            <img src={match.dog?.images?.[0] || 'https://via.placeholder.com/80'} alt={match.dog?.name || 'Recommended dog'} className="h-20 w-20 rounded-xl object-cover" />
                                            <div>
                                                <h3 className="font-black text-[#3C3C3C]">{match.dog?.name || 'Recommended dog'}</h3>
                                                <p className="text-sm font-bold text-[#1899D6]">{match.dog?.breed || 'Breed information unavailable'} · {match.dog?.size || 'Size unavailable'}</p>
                                                <p className="mt-1 text-xs font-medium text-[#777]">{match.reasons?.slice(0, 2).join(' · ')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                                            <span className="rounded-xl bg-[#58CC02]/10 px-3 py-2 text-sm font-black text-[#46A302]">{match.score}% match</span>
                                            {match.dog?._id && <button type="button" onClick={() => navigate(`/adopt/${match.dog._id}`)} className="rounded-xl px-3 py-2 text-sm font-black text-[#5F5BD7] hover:bg-white">View dog</button>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border-2 border-dashed border-[#E5E5E5] bg-[#F7F7F7] py-10 text-center">
                                <p className="mb-4 font-bold text-[#AFAFAF]">Take the lifestyle quiz to see your personalized dog matches here.</p>
                                <button type="button" onClick={() => navigate('/quiz')} className="rounded-xl bg-[#58CC02] px-5 py-3 text-sm font-black text-white hover:bg-[#46A302]">Take the quiz</button>
                            </div>
                        )}
                    </div>

                    {/* Adoption Requests */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#EAF5F9] text-[#1899D6] rounded-2xl">
                                <PawPrint size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-[#3C3C3C]">My Adoptions</h2>
                        </div>
                        
                        {adoptions.length === 0 ? (
                            <div className="text-center py-10 bg-[#F7F7F7] rounded-2xl border-2 border-dashed border-[#E5E5E5]">
                                <p className="text-[#AFAFAF] font-bold">No adoption requests yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {adoptions.map(req => (
                                    <div key={req._id} className="flex items-center justify-between p-5 bg-[#F8F9FE] rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <img src={req.dog?.images[0] || 'https://via.placeholder.com/50'} alt="Dog" className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                                            <div>
                                                <h3 className="font-black text-[#3C3C3C]">{req.dog?.name || 'Unknown Dog'}</h3>
                                                <p className="text-xs text-[#AFAFAF] font-medium flex items-center gap-1 mt-1">
                                                    <Calendar size={12} /> {new Date(req.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${
                                            req.status === 'approved' ? 'bg-[#58CC02]/10 text-[#46A302]' : 
                                            req.status === 'rejected' ? 'bg-red-100 text-red-600' : 
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {req.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rescue Reports */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                <AlertCircle size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-[#3C3C3C]">Rescue Reports</h2>
                        </div>

                        {rescues.length === 0 ? (
                            <div className="text-center py-10 bg-[#F7F7F7] rounded-2xl border-2 border-dashed border-[#E5E5E5]">
                                <p className="text-[#AFAFAF] font-bold">No rescues reported.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {rescues.map(rep => (
                                    <div key={rep._id} className="flex flex-col p-5 bg-[#F7F7F7] rounded-2xl border border-[#E5E5E5] hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-black text-[#3C3C3C]">{rep.location}</h3>
                                            <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                rep.status === 'resolved' ? 'bg-[#58CC02] text-white' : 
                                                rep.status === 'responding' ? 'bg-[#1899D6] text-white' : 
                                                'bg-[#AFAFAF] text-white'
                                            }`}>
                                                {rep.status}
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#777] line-clamp-2">{rep.description}</p>
                                        <p className="text-[10px] text-[#AFAFAF] font-bold mt-3 align-bottom">
                                            {new Date(rep.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Services Booked */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">
                                <CalendarCheck size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-[#3C3C3C]">My Service Bookings</h2>
                        </div>

                        {services.length === 0 ? (
                            <div className="text-center py-10 bg-[#F7F7F7] rounded-2xl border-2 border-dashed border-[#E5E5E5]">
                                <p className="text-[#AFAFAF] font-bold">No services booked yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map(svc => (
                                    <div key={svc._id} className="flex flex-col p-5 bg-[#F8F9FE] rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-black text-[#5F5BD7]">{svc.service}</h3>
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                svc.status === 'completed' ? 'bg-[#58CC02]/10 text-[#46A302]' :
                                                svc.status === 'ongoing' ? 'bg-[#1899D6]/10 text-[#1899D6]' :
                                                svc.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                                                'bg-yellow-100 text-yellow-600'
                                            }`}>{svc.status || 'pending'}</span>
                                        </div>
                                        <p className="text-sm text-[#3C3C3C] font-bold">📞 {svc.contact}</p>
                                        <p className="text-xs text-[#AFAFAF] mt-2 flex items-center gap-1">
                                            <Calendar size={12} /> {new Date(svc.date).toLocaleDateString()} · {svc.time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Profile;
