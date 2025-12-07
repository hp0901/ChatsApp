import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authapi"; // ✅ import login API

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle State

  // --- Blur validation ---
  const handleBlur = (field) => {
    if (field === "email" && !email) toast.error("Email is required!");
    if (field === "password" && !password) toast.error("Password is required!");
  };

  // --- Handle Login ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields!");
    }
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Login 🔐</h2>

      {/* Form */}
      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6"
        onSubmit={handleLogin}
      >
        {/* Email Input */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
          <FaLock className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type={showPassword ? "text" : "password"} // 👁️ toggle visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            required
          />

          {/* Eye Toggle */}
          <button
            type="button"
            className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p className="mt-4 text-gray-600 text-sm">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline font-medium">
          Sign Up
        </a>
      </p>
    </div>
  );
}
