import React, { useEffect, useState } from "react";
import { socket } from "../socket/socket";

const ChatBox = ({ roomId, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Join room on mount
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  // Send message
  const sendMsg = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      sender: userId,
      message,
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto mt-10 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Room: {roomId}</h2>

      <div className="h-64 overflow-y-auto border p-3 rounded mb-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={sendMsg}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
