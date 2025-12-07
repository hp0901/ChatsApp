// src/components/AudioFeature.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

export default function AudioFeature() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto mt-12"
    >
      <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
        <FaPhoneAlt className="text-3xl" />
        <h2 className="text-2xl font-bold">Audio Calling 📞</h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
        Enjoy crystal-clear voice calls with minimal data usage. Ideal for quick
        updates or long conversations with friends and colleagues.
      </p>
      <ul className="mt-4 text-left text-gray-600 dark:text-gray-400 list-disc list-inside">
        <li>🎧 High-quality voice clarity</li>
        <li>📊 Low data consumption</li>
        <li>📱 Multi-device support</li>
        <li>📜 Call history & recording options</li>
      </ul>
    </Motion.div>
  );
}
