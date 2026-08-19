import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const Chat = () => {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // If navigated from Dog details or Admin Dashboard, set selected user
    if (location.state?.shelterId) {
      setSelectedUser({ id: location.state.shelterId, name: "Shelter / Owner" });
    } else if (location.state?.targetUser) {
      setSelectedUser({ id: location.state.targetUser, name: location.state.targetUserName || "User" });
    }
  }, [location.state]);

  return (
    <div>
      <Navbar />
      <div className="h-screen w-full flex bg-[#f0f5f9] font-sans">
      <div className="container mx-auto my-auto flex h-[90vh] shadow-xl rounded-2xl">
        <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        <ChatWindow user={selectedUser} />
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default Chat;
