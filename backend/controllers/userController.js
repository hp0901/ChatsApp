import User from "../models/User.js";

// @desc Get logged in user details
// @route GET /api/user/me
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
