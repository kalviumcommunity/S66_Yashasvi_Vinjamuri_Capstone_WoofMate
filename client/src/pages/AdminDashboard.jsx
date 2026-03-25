import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { Loader2, Users, PawPrint, AlertCircle, CalendarCheck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('adoptions');

    // Data states
    const [users, setUsers] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [rescues, setRescues] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [usersResult, adoptionsResult, rescueResult, servicesResult] = await Promise.allSettled([
                axios.get(`${API_BASE_URL}/`, { withCredentials: true }),
                axios.get(`${API_BASE_URL}/api/adoptions/all`, { withCredentials: true }),
                axios.get(`${API_BASE_URL}/api/rescue/`),
                axios.get(`${API_BASE_URL}/api/service-bookings/all`, { withCredentials: true })
            ]);

            if (usersResult.status === 'fulfilled') setUsers(usersResult.value.data);
            if (adoptionsResult.status === 'fulfilled') setAdoptions(adoptionsResult.value.data);
            if (rescueResult.status === 'fulfilled') setRescues(rescueResult.value.data.reports || rescueResult.value.data);
            if (servicesResult.status === 'fulfilled') setServices(servicesResult.value.data);

            // Log any failures for debugging
            [usersResult, adoptionsResult, rescueResult, servicesResult].forEach((r, i) => {
                if (r.status === 'rejected') console.error(`Admin fetch [${i}] failed:`, r.reason?.response?.data || r.reason?.message);
            });
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateAdoptionStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/api/adoptions/${id}/status`, { status }, { withCredentials: true });
            setAdoptions(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        } catch (error) {
            console.error("Failed to update adoption status", error);
        }
    };

    const updateRescueStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/api/rescue/${id}/status`, { status }, { withCredentials: true });
            setRescues(prev => prev.map(r => r._id === id ? { ...r, status } : r));
        } catch (error) {
            console.error("Failed to update rescue status", error);
        }
    };

    const updateServiceStatus = async (id, status) => {
        try {
            await axios.put(`${API_BASE_URL}/api/service-bookings/${id}/status`, { status }, { withCredentials: true });
            setServices(prev => prev.map(s => s._id === id ? { ...s, status } : s));
        } catch (error) {
            console.error("Failed to update service status", error);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/users/${id}`, { withCredentials: true });
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    const deleteService = async (id) => {
        if (!window.confirm("Delete this booking?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/service-bookings/${id}`, { withCredentials: true });
            setServices(prev => prev.filter(s => s._id !== id));
        } catch (error) {
            console.error("Failed to delete service", error);
        }
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
                
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-[#3C3C3C]">Admin Dashboard</h1>
                    <p className="text-[#AFAFAF] font-medium text-lg">Manage users, adoptions, rescues, and services.</p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Pending Adoptions', count: adoptions.filter(a => a.status === 'pending').length, icon: <PawPrint size={24} />, color: 'text-[#1899D6]', bg: 'bg-[#EAF5F9]' },
                        { label: 'Active Rescues', count: rescues.filter(r => r.status !== 'resolved').length, icon: <AlertCircle size={24} />, color: 'text-red-500', bg: 'bg-red-50' },
                        { label: 'Service Bookings', count: services.length, icon: <CalendarCheck size={24} />, color: 'text-purple-500', bg: 'bg-purple-50' },
                        { label: 'Total Users', count: users.length, icon: <Users size={24} />, color: 'text-[#5F5BD7]', bg: 'bg-indigo-50' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 cursor-pointer hover:shadow-md transition-all">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-[#3C3C3C]">{stat.count}</h3>
                                <p className="text-[#AFAFAF] font-bold text-xs uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex overflow-x-auto border-b border-gray-100 custom-scrollbar">
                        {['adoptions', 'users', 'rescues', 'services'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-5 font-black uppercase tracking-widest text-sm whitespace-nowrap transition-colors ${
                                    activeTab === tab ? 'text-[#5F5BD7] border-b-2 border-[#5F5BD7]' : 'text-[#AFAFAF] hover:text-[#3C3C3C]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        {activeTab === 'adoptions' && (
                            <div className="space-y-4">
                                {adoptions.length === 0 ? <p className="text-[#AFAFAF] font-bold">No adoption requests found.</p> : adoptions.map(req => (
                                    <div key={req._id} className="flex flex-col md:flex-row items-center justify-between p-5 bg-[#F8F9FE] rounded-2xl border border-indigo-50">
                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                            <div className="bg-white p-3 rounded-xl border border-gray-100">
                                                <h3 className="font-black text-[#3C3C3C]">{req.dog?.name || 'Unknown Dog'}</h3>
                                                <p className="text-xs text-[#1899D6] font-bold uppercase tracking-wide">{req.dog?.breed}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#3C3C3C]">Requested by: {req.user?.name || 'Unknown User'}</p>
                                                <p className="text-xs text-[#AFAFAF]">{req.user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            {req.status === 'pending' ? (
                                                <>
                                                    <button onClick={() => updateAdoptionStatus(req._id, 'approved')} className="px-4 py-2 bg-[#58CC02] hover:bg-[#46A302] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Approve</button>
                                                    <button onClick={() => updateAdoptionStatus(req._id, 'rejected')} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Reject</button>
                                                </>
                                            ) : (
                                                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${req.status === 'approved' ? 'bg-[#58CC02]/10 text-[#46A302]' : 'bg-red-100 text-red-600'}`}>
                                                    {req.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {users.length === 0 ? <p className="text-[#AFAFAF] font-bold">No users found.</p> : users.map(user => (
                                    <div key={user._id} className="p-6 bg-[#F7F7F7] rounded-2xl border border-[#E5E5E5] flex items-center justify-between">
                                        <div>
                                            <h3 className="font-black text-[#3C3C3C]">{user.name}</h3>
                                            <p className="text-xs text-[#AFAFAF] mb-2">{user.email}</p>
                                            <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md font-bold uppercase tracking-widest text-[#5F5BD7]">
                                                {user.role || 'Adopter'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => navigate('/chat', { state: { targetUser: user._id, targetUserName: user.name } })}
                                                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-[#1899D6] hover:bg-[#1899D6] hover:text-white flex justify-center items-center transition-colors shadow-sm"
                                                title="Chat with user"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="w-9 h-9 rounded-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white flex justify-center items-center transition-colors"
                                                title="Delete user"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'rescues' && (
                            <div className="space-y-4">
                                {rescues.length === 0 ? <p className="text-[#AFAFAF] font-bold">No rescue reports.</p> : rescues.map(rep => (
                                    <div key={rep._id} className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#E5E5E5]">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-black text-[#3C3C3C]">📍 {rep.location}</h3>
                                                <p className="text-sm text-[#777] mt-1">{rep.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                                <select
                                                    value={rep.status || 'reported'}
                                                    onChange={(e) => updateRescueStatus(rep._id, e.target.value)}
                                                    className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-[#5F5BD7] cursor-pointer"
                                                >
                                                    <option value="reported">Reported</option>
                                                    <option value="responding">Responding</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'services' && (
                            <div className="space-y-4">
                                {services.length === 0 ? <p className="text-[#AFAFAF] font-bold">No service bookings.</p> : services.map(svc => (
                                    <div key={svc._id} className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#E5E5E5] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <h3 className="font-black text-[#5F5BD7]">{svc.service}</h3>
                                            <p className="text-sm font-bold text-[#3C3C3C]">Contact: {svc.contact}</p>
                                            <p className="text-xs text-[#AFAFAF] mt-1">{new Date(svc.date).toLocaleDateString()} · {svc.time}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <select
                                                value={svc.status || 'pending'}
                                                onChange={(e) => updateServiceStatus(svc._id, e.target.value)}
                                                className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-[#5F5BD7] cursor-pointer"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="ongoing">Ongoing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button
                                                onClick={() => deleteService(svc._id)}
                                                className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors border border-red-100"
                                                title="Delete booking"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
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

export default AdminDashboard;
