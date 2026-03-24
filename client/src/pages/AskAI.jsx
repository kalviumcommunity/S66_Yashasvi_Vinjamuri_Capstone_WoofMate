import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { Send, Bot, User } from "lucide-react";

const AskAI = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm your WoofMate AI assistant. How can I help you with your dog today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/chat`, { message: input });
      const aiReply = response.data.reply;

      setMessages(prev => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-[600px]">

          <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
            <Bot size={28} />
            <div>
              <h2 className="text-xl font-bold">WoofMate AI</h2>
              <p className="text-sm text-indigo-100">Ask me anything about dog care, training, or breeds!</p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-indigo-500" : "bg-gray-300"}`}>
                    {msg.role === "user" ? <User size={18} className="text-white" /> : <Bot size={18} className="text-gray-700" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white border text-gray-800 rounded-tl-none"}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border p-4 rounded-2xl rounded-tl-none flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t">
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AskAI;
