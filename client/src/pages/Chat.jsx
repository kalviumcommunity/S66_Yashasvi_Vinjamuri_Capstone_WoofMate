import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("Tyson");
  return (
    <div>
      <Navbar />
      <div className="h-screen w-full flex bg-[#f0f5f9] font-sans">
      <div className="container mx-auto my-auto flex h-[90vh] shadow-xl rounded-2xl">
        <Sidebar onSelectUser={setSelectedUser} />
        <ChatWindow user={selectedUser} />
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default Chat;
