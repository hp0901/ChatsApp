import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { socket } from '../socket/socket';
import { useSelector } from 'react-redux';

export default function Chat() {
  const navigate = useNavigate();
  const { roomId: paramRoomId } = useParams();
  const roomId = paramRoomId || 'general';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);

  // --- Auth & User State ---
  const user = useSelector((state) => state.auth.user);
  // Assuming 'token' existence determines if the user is logged in
  const isLoggedIn = useSelector((state) => state.auth.token !== null && state.auth.token !== undefined); 
  const username = user?.username || 'Guest';

  // --- 🔒 Fix 2: Redirect if Not Logged In ---
  useEffect(() => {
    if (!isLoggedIn) {
      // Use the navigate function to send the user to the login page
      navigate('/login'); 
    }
  }, [isLoggedIn, navigate]);


  // --- Socket.IO Handlers ---
  useEffect(() => {
    if (!isLoggedIn) return; // Stop if not logged in

    // Join the room
    socket.emit('joinRoom', roomId);
    console.log('Joined room:', roomId);

    // Define the handler function for receiving messages
    const handleReceiveMessage = (data) => {
  setMessages((prev) => {
    // Prevent duplicate for the sender
    if (prev.some(msg => msg.createdAt === data.createdAt && msg.senderId === data.senderId)) {
      return prev;
    }
    return [...prev, data];
  });
};


    // Register the handler
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      // FIX 1: Clean up the EXACT handler function to prevent duplicate messages
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [roomId, isLoggedIn]); // Re-run effect if roomId or login status changes

  // --- Auto-Scroll ---
  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Send Message Logic ---
  const sendMessage = () => {
    if (!input.trim() || !isLoggedIn) return; // Prevent sending if input is empty or not logged in

    const payload = {
      roomId,
      senderId: socket.id,
      senderName: username,
      message: input.trim(),
      createdAt: Date.now()
    };

    // FIX 1: Optimistic UI Update (Add the message instantly to the sender's local state)
    setMessages((prev) => [...prev, payload]); 

    socket.emit('sendMessage', payload);
    setInput('');
  };

  // Check if the input/button should be enabled
  const isChatEnabled = isLoggedIn; 

  return (
    <div className="flex flex-col h-screen">
      {/* --- Header --- */}
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Room: {roomId}</h1>
        <div className="text-sm">Your name: <b>{username}</b></div>
      </header>

      {/* --- Message Display Area --- */}
      <div ref={messagesRef} className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg, idx) => {
          const isMe = msg.senderName === username;
          
          // FIX 3: Dynamic Classes for Alignment and Color
          const alignmentClass = isMe ? 'justify-end' : 'justify-start';
          const bubbleClass = isMe 
            ? 'bg-blue-600 text-white'       // Sender: Right side, Blue background
            : 'bg-gray-300 text-gray-900';   // Receiver: Left side, Grey background

          return (
            <div key={idx} className={`mb-3 flex ${alignmentClass}`}>
              
              <div className={`px-4 py-2 rounded-xl max-w-xs break-words shadow-md ${bubbleClass}`}>
                
                <div className="text-xs opacity-80 mb-1 font-semibold">
                  {/* Display 'You' for the sender, or the sender's name for the receiver */}
                  {isMe ? 'You' : msg.senderName}
                </div>
                <div>{msg.message}</div>
                
                <div className="text-xs opacity-60 mt-1 text-right">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Input Area --- */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          className={`flex-1 border rounded-full px-4 py-2 focus:outline-none ${
            isChatEnabled ? 'border-gray-300 focus:ring-2 focus:ring-blue-500' : 'border-red-500 bg-gray-100'
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isChatEnabled ? "Type your message..." : "Please log in to chat"}
          onKeyDown={(e) => { if (e.key === 'Enter' && isChatEnabled) sendMessage(); }}
          disabled={!isChatEnabled} // Input is disabled if not logged in
        />
        <button
          onClick={sendMessage}
          className={`px-6 py-2 rounded-full font-semibold transition duration-150 ${
            (isChatEnabled && input.trim())
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed' // Button is disabled if no input OR not logged in
          }`}
          disabled={!isChatEnabled || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}