import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// Using placeholder User IDs since there is no live auth Context in this snippet
const currentUserId = "64e0f9b3e6d2b638f4d9c0a1"; // Current logged in user (Adopter)
const shelterUserId = "64e0f9b3e6d2b638f4d9c0a2"; // The shelter or owner they are chatting with

const socket = io("http://localhost:4545", {
  withCredentials: true,
});

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    // 1. Fetch existing chat history between the current user and the shelter
    const fetchHistory = async () => {
      try {
        const response = await axios.post("http://localhost:4545/api/chat/get", {
          userId1: currentUserId,
          userId2: shelterUserId
        });
        setChatId(response.data._id);

        // Map backend schema to frontend UI format
        const history = response.data.messages.map(msg => ({
          text: msg.text,
          sender: msg.senderId === currentUserId ? "me" : "other"
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
    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, { text: data.text, sender: "other" }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim() || !chatId) return;

    // Optimistically update UI
    setMessages(prev => [...prev, { text: input, sender: "me" }]);

    // Emit through socket to other users
    socket.emit("send_message", {
      chatId,
      senderId: currentUserId,
      text: input
    });

    // Save to database
    try {
      await axios.post("http://localhost:4545/api/chat/message", {
        senderId: currentUserId,
        receiverId: shelterUserId,
        text: input
      });
    } catch (error) {
      console.error("Failed to save message to DB:", error);
    }

    setInput("");
  };

  return (
    <div className="w-2/3 bg-[#e7ebee] flex flex-col justify-between rounded-r-2xl">
      <div className="border-b border-gray-300 px-6 py-4 flex justify-between items-center bg-[#c5d6e4] rounded-tr-2xl">
        <div>
          <div className="font-bold text-lg">{user}</div>
          <div className="text-xs text-gray-500">last seen 14:02</div>
        </div>
        <div className="space-x-4 text-gray-600">
          <button>📞</button>
          <button>📷</button>
          <button>⋮</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "me"
                  ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                  : "bg-white border text-gray-800 rounded-bl-none shadow-sm"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 px-4 py-3 flex items-center gap-2 bg-white rounded-b-2xl">
        <button>😊</button>
        <button>📎</button>
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button>🎤</button>
        <button onClick={sendMessage}>📨</button>
      </div>
    </div>
  );
};

export default ChatWindow;
