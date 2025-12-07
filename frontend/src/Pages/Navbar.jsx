import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaMoon,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "../assets/logo_light_theme.png";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Access Redux auth state
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Define base links (common for everyone)
  const commonLinks = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
    { name: "Contact", icon: <FaPhone />, path: "/contact" },
  ];

  // ✅ Links only for logged-in users
  const authLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  // ✅ Links for non-logged users
  const guestLinks = [
    { name: "Login", icon: <FaSignInAlt />, path: "/login" },
    { name: "Signup", icon: <FaUserPlus />, path: "/signup" },
  ];

  // ✅ Dark mode (placeholder)
  const darkModeLink = [{ name: "Dark Mode", icon: <FaMoon />, path: "#" }];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-gray-800 dark:to-gray-900 shadow-md z-50">
      {/* LEFT: Hamburger Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <FaBars />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-14 left-0 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-5 transition-all duration-300 animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
            >
              <FaTimes />
            </button>

            <div className="mt-4 space-y-3">
              {/* Common links */}
              {commonLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                >
                  {link.icon} <span>{link.name}</span>
                </Link>
              ))}

              {/* Authenticated user links */}
              {token && (
                <>
                  {authLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                    >
                      {link.icon} <span>{link.name}</span>
                    </Link>
                  ))}
                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 w-full rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-700 transition font-semibold"
                  >
                    <FaSignOutAlt /> <span>Logout</span>
                  </button>
                </>
              )}

              {/* Guest user links */}
              {!token &&
                guestLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                  >
                    {link.icon} <span>{link.name}</span>
                  </Link>
                ))}

              {/* Dark Mode Toggle */}
              {darkModeLink.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                >
                  {link.icon} <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Logo */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl transition">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src={logo}
            alt="App Logo"
            className="h-8 w-8 object-contain rounded-none"
          />
          <h2 className="text-white font-semibold text-lg">ChatsApp</h2>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
