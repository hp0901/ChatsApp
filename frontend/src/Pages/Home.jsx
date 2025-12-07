import React, { useState } from "react";
import { FaVideo, FaComments, FaUsers, FaPhoneAlt, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ChatFeature from "../Feature/ChatFeature.jsx";
import VideoCallFeature from "../Feature/VideoFeature.jsx";
import AudioCallFeature from "../Feature/AudioFeature.jsx";

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const callRoutes = {
    chat: "/chat",
    video: "/video-call",
    audio: "/voice",
  };

  const handleOptionClick = (type) => {
    toast.success(`Redirecting to ${type}... 🚀`);
    setShowOptions(false);
    navigate(callRoutes[type]);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") setShowOptions(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 transition-colors duration-500 pt-24">
      
      {/* 🌟 Hero Section */} 
      <section className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20 w-full max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex flex-wrap items-center justify-center gap-2"
        >
          <FaVideo className="text-blue-500 text-2xl sm:text-3xl" />
          Welcome to <span className="text-blue-700 dark:text-blue-300">VideoChat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 px-2"
        >
          Connect with friends, family, or colleagues through real-time video, audio, and chat — all in one place.
        </motion.p>

        {/* Icons */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl md:text-4xl mb-10">
          <FaComments title="Chat" className="hover:scale-110 transition-transform" />
          <FaUsers title="Friends" className="hover:scale-110 transition-transform" />
          <FaPhoneAlt title="Voice Call" className="hover:scale-110 transition-transform" />
          <FaVideo title="Video Call" className="hover:scale-110 transition-transform" />
        </div>

        {/* Join Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowOptions(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-2xl shadow-lg transition font-semibold text-sm sm:text-base"
        >
          Join a Call 🚀
        </motion.button>
      </section>

      {/* ✨ Divider */}
      <div className="w-3/4 h-[1px] bg-gray-300 dark:bg-gray-700 my-10"></div>

      {/* 📞 Feature Sections */}
      <section className="flex flex-col gap-16 sm:gap-20 w-full max-w-6xl mx-auto pb-20">
        <ChatFeature />
        <AudioCallFeature />
        <VideoCallFeature />
      </section>

      {/* 🎯 Modal */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            id="overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm text-center"
            >
              {/* ❌ Cancel Icon */}
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 mt-4">
                Choose Your Mode 🎯
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleOptionClick("chat")}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => handleOptionClick("video")}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                >
                  🎥 Video Call
                </button>
                <button
                  onClick={() => handleOptionClick("audio")}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                >
                  📞 Audio Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
