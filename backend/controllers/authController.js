import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, mobile, gender } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create user
    const user = await User.create({ firstName, lastName, email, password, mobile, gender });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { id: user._id, email: user.email, name: `${user.firstName} ${user.lastName}` },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: `${user.firstName} ${user.lastName}` },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
