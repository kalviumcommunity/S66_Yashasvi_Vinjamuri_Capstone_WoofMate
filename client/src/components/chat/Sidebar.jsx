import React from "react";

const chats = [
  { name: "Tyson", lastMsg: "hey! what's up?", time: "14:00", online: true },
  { name: "Browny", lastMsg: "hey! what's up?", time: "14:00", online: false },
  { name: "Bakki", lastMsg: "hey! what's up?", time: "14:00", online: true },
  { name: "Snoopy", lastMsg: "hey! what's up?", time: "14:00", online: true },
];

const Sidebar = ({ onSelectUser }) => {
  return (
    <div className="w-1/3 bg-[#c5d6e4] p-4 rounded-l-2xl">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
      />
      {chats.map((chat, index) => (
        <div
          key={index}
          onClick={() => onSelectUser(chat.name)}
          className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-gray-100"
        >
          <div>
            <div className="font-bold">{chat.name}</div>
            <div className="text-sm text-gray-500">{chat.lastMsg}</div>
          </div>
          <div className="text-xs text-right text-gray-400">
            {chat.time}
            <div
              className={`w-2 h-2 rounded-full mt-1 ${
                chat.online ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
