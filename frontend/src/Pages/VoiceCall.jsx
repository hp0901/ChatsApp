import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { motion } from "framer-motion";
import { FaPhoneSlash, FaMicrophone, FaVolumeUp, FaMicrophoneSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { BsVolumeUp, BsVolumeUpFill } from "react-icons/bs";

// ⚠️ ASSUMPTION: Replace with your actual socket import
// import { socket } from '../socket/socket';

// ⚠️ ASSUMPTION: Define STUN server configuration
const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};

export default function VoiceCall() {
  const [status, setStatus] = useState("Initializing...");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [callActive, setCallActive] = useState(false); // New state for active call

  // Refs to hold persistent objects
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // 1. Core Logic to Get Audio and Setup Connection
  useEffect(() => {
    const initializeCall = async () => {
      // Get the local audio stream
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        localStreamRef.current = stream;

        // Set the initial status and update local controls
        setStatus("Ready to Call");
        setMuted(false); // Start unmuted

        // Create the Peer Connection
        const pc = new RTCPeerConnection(iceServers);
        peerConnectionRef.current = pc;

        // Add local tracks to the peer connection
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Handle receiving remote tracks (audio from the other user)
        pc.ontrack = (event) => {
          if (event.streams && event.streams[0]) {
            // ⚠️ In a real app, you would attach event.streams[0] to an <audio> tag
            console.log("Remote stream received:", event.streams[0]);
          }
        };
        
        // ⚠️ Placeholder for signaling implementation (needs to be implemented fully)
        // pc.onicecandidate = (event) => {
        //   if (event.candidate) {
        //     socket.emit('iceCandidate', { candidate: event.candidate, to: otherUserId });
        //   }
        // };

        // For simulation purposes:
        const timer = setTimeout(() => {
            setStatus("Ongoing Call");
            setCallActive(true);
        }, 3000);
        return () => clearTimeout(timer);

      } catch (error) {
        setStatus("Microphone Access Denied");
        console.error("Microphone access failed:", error);
      }
    };

    initializeCall();

    // 2. Cleanup Function
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  // 3. Control Functions
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    
    // Mute/Unmute the actual audio track
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !newMuted;
      });
    }
  };

  const endCall = () => {
    // ⚠️ In a real app, you would emit a 'callEnd' event via socket here
    
    // Stop local media
    if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    // Close peer connection
    if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
    }
    setStatus("Call Ended");
    setCallActive(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative"
    >
      {/* Blurred Circle Backgrounds (Styling) */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Call Info */}
      <div className="z-10 text-center">
        <motion.img
          src="https://i.pravatar.cc/200"
          alt="User Avatar"
          className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        <h2 className="text-3xl font-semibold mt-4">Harsh Patel</h2>
        <p className="text-lg text-gray-200 mt-1">{status}</p>
      </div>

      {/* Call Controls */}
      <div className="z-10 flex items-center justify-center gap-10 mt-10">
        {/* Mute/Unmute */}
        <button
          onClick={toggleMute}
          className={`p-5 rounded-full bg-white/10 ${muted ? 'bg-red-500/50' : 'hover:bg-white/20'} transition`}
          title={muted ? "Unmute" : "Mute"}
          disabled={!callActive}
        >
          {muted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
        </button>

        {/* End Call */}
        <Link 
          to="/chat" 
          onClick={endCall} // Call the cleanup function before navigating
          className="bg-red-500 rounded-full p-5 hover:bg-red-600 transition"
        >
          <FaPhone size={24} />
        </Link>

        {/* Speaker (Toggles UI State only) */}
        <button
          onClick={() => setSpeaker(!speaker)}
          className={`p-5 rounded-full bg-white/10 ${speaker ? 'bg-blue-300/50' : 'hover:bg-white/20'} transition`}
          title="Speaker"
          disabled={!callActive}
        >
          {speaker ? <BsVolumeUpFill size={24} /> : <BsVolumeUp size={24} />}
        </button>
      </div>
    </motion.div>
  );
}