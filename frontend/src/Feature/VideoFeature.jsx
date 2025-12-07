// src/components/VideoFeature.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";

export default function VideoFeature() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto mt-12 mb-20"
    >
      <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
        <FaVideo className="text-3xl" />
        <h2 className="text-2xl font-bold">Video Calling 🎥</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
        Host one-on-one or group video calls with HD quality and instant screen
        sharing. Stay closer no matter the distance.
      </p>
      <ul className="mt-4 text-left text-gray-600 dark:text-gray-400 list-disc list-inside">
        <li>🧑‍🤝‍🧑 Group meetings support</li>
        <li>📺 Screen sharing & presentation mode</li>
        <li>⚡ Real-time reactions</li>
        <li>🛡️ Secure video encryption</li>
      </ul>
    </Motion.div>
  );
}
