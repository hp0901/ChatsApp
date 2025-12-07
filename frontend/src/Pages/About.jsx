import React from "react";
import { FaInfoCircle, FaLaptopCode, FaShieldAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
        <FaInfoCircle /> About VideoChat
      </h1>

      <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
        VideoChat is a modern communication platform inspired by WhatsApp and
        Google Meet. Built with the MERN Stack, it ensures secure and
        lightning-fast connections for messaging and video calls.
      </p>

      <div className="flex gap-10 text-green-500 dark:text-green-400 text-3xl">
        <FaLaptopCode title="MERN Stack" />
        <FaShieldAlt title="Secure & Encrypted" />
      </div>
    </div>
  );
}
