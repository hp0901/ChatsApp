import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Settings from "./Pages/Settings";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import VideoCall from "./Pages/VideoCall";
import Chat from "./Pages/Chat";
import VoiceCall from "./Pages/VoiceCall";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(
      `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated 🌗`
    );
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
    {/* <div className="w-full min-h-full bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/voice" element={<VoiceCall />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      {/* </div> */}
    </div>
  );
}
