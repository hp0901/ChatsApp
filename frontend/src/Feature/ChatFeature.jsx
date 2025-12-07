// src/components/ChatFeature.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { FaComments } from "react-icons/fa";

export default function ChatFeature() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto mt-12"
    >
      <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
        <FaComments className="text-3xl" />
        <h2 className="text-2xl font-bold">Chat Feature 💬</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
        Stay connected with instant text messaging that’s secure and real-time.
        Our chat supports group conversations, emojis, and media sharing.
        Collaborate or chill — your choice!
      </p>
      <ul className="mt-4 text-left text-gray-600 dark:text-gray-400 list-disc list-inside">
        <li>🕐 Real-time messaging</li>
        <li>📎 File and media sharing</li>
        <li>🔒 End-to-end encryption</li>
        <li>👥 Group & private chats</li>
      </ul>
    </Motion.div>
  );
}
