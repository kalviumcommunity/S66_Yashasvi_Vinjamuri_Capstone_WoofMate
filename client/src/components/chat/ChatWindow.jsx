import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const socket = io(API_BASE_URL, {
  withCredentials: true,
});

const ChatWindow = ({ user }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    if (!currentUser || !user?.id) return;
    
    // 1. Fetch existing chat history between the current user and the selected user
    const fetchHistory = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/chat/get`, {
          userId1: currentUser._id,
          userId2: user.id
        });
        setChatId(response.data._id);

        // Map backend schema to frontend UI format
        const history = response.data.messages.map(msg => ({
          text: msg.text,
          sender: msg.senderId === currentUser._id ? "me" : "other"
        }));
        setMessages(history);

        // 2. Join the Socket room for this specific chat
        socket.emit("join_chat", response.data._id);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };
    fetchHistory();

    // 3. Listen for incoming messages from Socket.io
    const handleReceiveMessage = (data) => {
      if (data.senderId !== currentUser._id) {
         setMessages(prev => [...prev, { text: data.text, sender: "other" }]);
      }
    };
    
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [user, currentUser]);

  const sendMessage = async () => {
    if (!input.trim() || !chatId || !currentUser) return;

    // Optimistically update UI
    setMessages(prev => [...prev, { text: input, sender: "me" }]);

    // Emit through socket to other users
    socket.emit("send_message", {
      chatId,
      senderId: currentUser._id,
      text: input
    });

    // Save to database
    try {
      await axios.post(`${API_BASE_URL}/api/chat/message`, {
        senderId: currentUser._id,
        receiverId: user.id,
        text: input
      });
    } catch (error) {
      console.error("Failed to save message to DB:", error);
    }

    setInput("");
  };

  if (!user || !user.id) {
    return (
       <div className="w-2/3 bg-[#F7F7F7] flex flex-col justify-center items-center rounded-r-3xl border-l border-gray-100">
         <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-6 animate-bounce">
            <span className="text-4xl">🐾</span>
         </div>
         <h3 className="text-2xl font-black text-[#AFAFAF] tracking-tight">Select a chat to start messaging</h3>
       </div>
    );
  }

  return (
    <div className="w-2/3 bg-[#F7F7F7] flex flex-col justify-between rounded-r-3xl relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1899D6]/10 to-[#58CC02]/5 rounded-bl-full pointer-events-none -mr-10 -mt-10"></div>
      
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex justify-between items-center z-10 sticky top-0 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-sm ${user.id === 'woofmate-support-001' ? 'bg-gradient-to-br from-[#1899D6] to-[#0A73A6] text-white' : 'bg-gradient-to-br from-[#5F5BD7] to-[#827FFE] text-white'}`}>
             {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-black text-xl text-[#3C3C3C] tracking-tight">{user.name}</div>
            <div className="text-xs font-bold text-[#58CC02] flex items-center gap-1.5 mt-0.5 uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full inline-block animate-pulse"></span> Online</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-xl bg-[#F7F7F7] hover:bg-[#EAF5F9] text-[#1899D6] flex justify-center items-center transition-colors">📞</button>
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-xl bg-[#F7F7F7] hover:bg-[#EAF5F9] text-[#1899D6] flex justify-center items-center transition-colors">📷</button>
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-xl bg-[#F7F7F7] hover:bg-[#E5E5E5] text-[#3C3C3C] flex justify-center items-center transition-colors">⋮</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 z-10 custom-scrollbar flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-5 py-3 rounded-2xl text-[15px] font-medium leading-relaxed ${msg.sender === "me"
                ? "bg-gradient-to-br from-[#5F5BD7] to-[#827FFE] text-white rounded-br-sm shadow-[0_4px_14px_rgba(95,91,215,0.3)]"
                : "bg-white border border-[#E5E5E5] text-[#3C3C3C] rounded-bl-sm shadow-sm"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 p-6 z-10">
        <div className="flex items-center gap-2 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full p-1.5 px-3 focus-within:ring-2 focus-within:ring-[#1899D6]/20 focus-within:border-[#1899D6] transition-all">
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-full hover:bg-white text-[#AFAFAF] hover:text-[#5F5BD7] flex justify-center items-center transition-colors">😊</button>
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-full hover:bg-white text-[#AFAFAF] hover:text-[#5F5BD7] flex justify-center items-center transition-colors shadow-[0_0_10px_rgba(0,0,0,0.02)]">📎</button>
          <input
            className="flex-1 bg-transparent px-2 py-2 focus:outline-none text-[#3C3C3C] font-medium placeholder-[#AFAFAF]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={() => alert('Feature coming soon in V2!')} className="w-10 h-10 rounded-full hover:bg-white text-[#AFAFAF] flex justify-center items-center transition-colors mr-1">🎤</button>
          <button 
            onClick={sendMessage}
            className="w-12 h-12 bg-[#58CC02] hover:bg-[#4ba803] text-white rounded-full flex justify-center items-center transition-transform hover:scale-105 shadow-lg shadow-green-200/50 flex-shrink-0"
          >
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
