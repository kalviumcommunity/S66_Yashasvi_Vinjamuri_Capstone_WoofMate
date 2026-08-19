import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ onSelectUser, selectedUser }) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchChats = async () => {
      try {
        const [chatRes, adminRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/chat/user/${currentUser._id}`),
          axios.get(`${API_BASE_URL}/admin`).catch(() => null)
        ]);

        const supportAdminId = adminRes?.data?._id;

        let hasSupport = false;
        const formattedChats = chatRes.data.map(chat => {
          const otherParticipant = chat.participants.find(p => p._id !== currentUser._id) || {};
          if (supportAdminId && otherParticipant._id === supportAdminId) hasSupport = true;
          
          const lastMsg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : {};
          return {
            id: otherParticipant._id,
            name: (supportAdminId && otherParticipant._id === supportAdminId) ? "WoofMate Support" : (otherParticipant.name || "Unknown User"),
            lastMsg: lastMsg.text || "No messages yet",
            time: lastMsg.timestamp ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "",
            online: false
          };
        });

        if (!hasSupport && supportAdminId && currentUser._id !== supportAdminId) {
          formattedChats.unshift({
             id: supportAdminId,
             name: "WoofMate Support",
             lastMsg: "Hi! How can we help you?",
             time: "",
             online: true
          });
        }
        
        setChats(formattedChats);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    }
    fetchChats();
  }, [currentUser]);

  return (
    <div className="w-1/3 bg-white border-r border-gray-100 p-6 flex flex-col rounded-l-3xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      <h2 className="text-2xl font-black text-[#3C3C3C] tracking-tight mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-[#58CC02] rounded-full inline-block"></span> Messages
      </h2>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-3 bg-[#F7F7F7] rounded-2xl border-none focus:ring-2 focus:ring-[#1899D6]/30 focus:outline-none transition-all text-sm font-medium text-[#3C3C3C]"
        />
        <svg className="w-5 h-5 text-[#AFAFAF] absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
      {chats.map((chat, index) => (
        <div
          key={index}
          onClick={() => onSelectUser({ id: chat.id, name: chat.name })}
          className={`flex items-center justify-between rounded-2xl px-4 py-3 cursor-pointer transition-all duration-300 ${selectedUser?.id === chat.id ? "bg-[#EAF5F9] border border-[#BDE0EF] shadow-sm transform scale-[1.02]" : "bg-white hover:bg-[#F7F7F7] border border-transparent"}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${chat.id === 'woofmate-support-001' ? 'bg-gradient-to-br from-[#1899D6] to-[#0A73A6] text-white' : 'bg-[#E5E5E5] text-[#777]'}`}>
                 {chat.name.charAt(0).toUpperCase()}
               </div>
               {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#58CC02] border-2 border-white rounded-full"></div>}
            </div>
            <div className="overflow-hidden">
              <div className={`font-black tracking-wide truncate ${selectedUser?.id === chat.id ? "text-[#1899D6]" : "text-[#3C3C3C]"}`}>{chat.name}</div>
              <div className={`text-sm truncate w-32 font-medium ${selectedUser?.id === chat.id ? "text-[#1899D6]/80" : "text-[#AFAFAF]"}`}>{chat.lastMsg}</div>
            </div>
          </div>
          <div className="text-xs text-right font-bold text-[#AFAFAF] flex-shrink-0">
            {chat.time}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;
