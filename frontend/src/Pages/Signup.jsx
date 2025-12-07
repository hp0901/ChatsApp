import React, { useState } from "react";
import { FaUser, FaEnvelope,FaVenusMars, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";
import { signUp } from "../services/operations/authapi";
import { useDispatch } from "react-redux";
// import { FaEnvelope, FaLock, FaUser,  } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, mobile, password, confirmPassword, gender } = user;

    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword || !gender) {
      return toast.error("All fields are required!");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!/^\d{10}$/.test(mobile)) {
      return toast.error("Enter a valid 10-digit mobile number!");
    }

    const signupData = { ...user };
    dispatch(setSignupData(signupData));
    dispatch(signUp(signupData, navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Signup 📝</h2>

      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6"
        onSubmit={handleSignup}
      >
        {/* First Name */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaUser className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type="text"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            required
          />
        </div>

        {/* Last Name */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaUser className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type="text"
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        {/* Mobile */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaPhone className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type="tel"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            required
          />
        </div>

        {/* Gender */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3">
          <FaVenusMars className="text-gray-400 mr-3" />
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male ♂️</option>
            <option value="Female">Female ♀️</option>
            <option value="Other">Other ⚧️</option>
          </select>
        </div>

        {/* Password */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaLock className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-green-500">
          <FaLock className="text-gray-400 mr-3" />
          <input
            className="w-full text-gray-700 outline-none placeholder-gray-500"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Signup
        </button>
      </form>

      <p className="mt-4 text-gray-600 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-green-600 hover:underline font-medium">
          Log In
        </a>
      </p>
    </div>
  );
}
