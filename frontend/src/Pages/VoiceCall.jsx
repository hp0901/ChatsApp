import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { FaPhoneSlash, FaMicrophone, FaVolumeUp, FaMicrophoneSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { BsVolumeUp,BsVolumeUpFill } from "react-icons/bs";

export default function VoiceCall() {
  const [status, setStatus] = useState("Calling...");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    // Simulate call connection after 3 seconds
    const timer = setTimeout(() => setStatus("Ongoing Call"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative"
    >
      {/* Blurred Circle Backgrounds */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Call Info */}
      <div className="z-10 text-center">
        <Motion.img
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
        {/* Mute */}
        <button
          onClick={() => setMuted(!muted)}
          className={`p-5 rounded-full bg-white/10 hover:bg-white/20 transition `}
          title="Mute"
        >
            { muted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
          
        </button>

        {/* End Call */}
        <Link to="/chat" className="bg-red-500 rounded-full p-5">
          <FaPhone size={24} />
        </Link>

        {/* Speaker */}
        <button
          onClick={() => setSpeaker(!speaker)}
          className={`p-5 rounded-full bg-white/10 hover:bg-white/20 transition `}
          title="Speaker"
        >
            { speaker ? <BsVolumeUpFill size={24} /> : <BsVolumeUp  size={24} /> }
        </button>
      </div>
    </Motion.div>
  );
}
