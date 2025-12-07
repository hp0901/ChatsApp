import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaUserAlt, FaCommentDots } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully 💬");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-6 flex items-center gap-2">
        <FaEnvelope /> Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <div className="flex items-center gap-2">
          <FaUserAlt className="text-purple-500" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <FaEnvelope className="text-purple-500" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <FaCommentDots className="text-purple-500 mt-2" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="flex-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
        >
          Send Message ✉️
        </button>
      </form>
    </div>
  );
}
