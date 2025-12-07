import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";
import { fetchUserProfile } from "../services/operations/ProfileApi";
import "./Navbar.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    const getProfile = async () => {
      const data = await fetchUserProfile(token);
      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
      setLoading(false);
    };

    getProfile();
  }, []);

  // 🌀 Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-700 dark:text-gray-200 animate-zoomOut">
        Loading profile...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 dark:text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  // ✅ Profile UI
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-transparent shadow-xl rounded-2xl p-8 w-full max-w-md text-gray-800 dark:text-gray-100 animate-zoomOut transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center mb-6">👤 Profile</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-700">
            <FaUser className="text-green-600" />
            <span className="font-medium">Name:</span>
            <span>{user?.firstName} {user?.lastName}</span>
          </div>

          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-700">
            <FaEnvelope className="text-blue-600" />
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-700">
            <FaPhone className="text-purple-600" />
            <span className="font-medium">Mobile:</span>
            <span>{user?.mobile || "N/A"}</span>
          </div>

          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-700">
            <FaVenusMars className="text-pink-600" />
            <span className="font-medium">Gender:</span>
            <span>{user?.gender || "N/A"}</span>
          </div>

          <div className="flex items-center gap-3 border-b pb-2 border-gray-300 dark:border-gray-700">
            <FaCalendarAlt className="text-gray-600 dark:text-gray-300" />
            <span className="font-medium">Joined On:</span>
            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <FaIdBadge className="text-indigo-600" />
            <span className="font-medium">User ID:</span>
            <span className="text-sm text-gray-600 dark:text-yellow-400 select-all">
              {user?._id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
