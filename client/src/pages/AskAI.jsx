import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { Send, Bot, User, Loader2 } from "lucide-react";

const AskAI = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm your WoofMate AI assistant. How can I help you with your dog today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/history`, { withCredentials: true });
      if (response.data.history && response.data.history.length > 0) {
        setMessages([
          { role: "assistant", content: "Welcome back! Here's our previous conversation:" },
          ...response.data.history
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch AI history:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/chat`, { message: input }, { withCredentials: true });
      const aiReply = response.data.reply;

      setMessages(prev => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[750px] border border-gray-100">

          <div className="bg-[#5F5BD7] p-6 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-2xl">
                <Bot size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">WoofMate AI</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-indigo-100 font-medium">Expert Canine Assistant</p>
                </div>
              </div>
            </div>
            <button 
                onClick={() => setMessages([{ role: "assistant", content: "Hi there! I'm your WoofMate AI assistant. How can I help you with your dog today?" }])}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition font-bold"
            >
                Clear View
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#F8F9FE] custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "user" ? "bg-[#5F5BD7] text-white" : "bg-white border-2 border-indigo-50"}`}>
                    {msg.role === "user" ? <User size={20} /> : <Bot size={20} className="text-[#5F5BD7]" />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#5F5BD7] text-white rounded-tr-none font-medium" 
                      : "bg-white border border-indigo-50 text-gray-800 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-3 max-w-[85%] items-center">
                    <div className="w-10 h-10 rounded-2xl bg-white border-2 border-indigo-50 flex items-center justify-center">
                        <Loader2 className="animate-spin text-[#5F5BD7]" size={20} />
                    </div>
                    <div className="bg-white border border-indigo-50 p-4 rounded-2xl rounded-tl-none flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
            <form onSubmit={sendMessage} className="flex gap-3 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about breeds, diet, health..."
                className="flex-grow px-6 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5F5BD7] transition-all text-gray-700 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#5F5BD7] hover:bg-[#4E4AB5] text-white rounded-2xl px-6 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 font-bold"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold">
                Powered by WoofMate Intelligence
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AskAI;
