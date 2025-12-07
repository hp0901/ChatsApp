import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";

const { USER_PROFILE } = profileEndpoints;

export const fetchUserProfile = async (token) => {
  try {
    // Pass header keys directly (do NOT wrap inside `headers: { ... }`)
    const response = await apiConnector(
      "GET",
      USER_PROFILE,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("✅ Profile API Response:", response.data);

    if (response.data.success) {
      return { success: true, user: response.data.user };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to fetch profile",
      };
    }
  } catch (error) {
    console.error("⚠️ Error fetching profile:", error);
    return {
      success: false,
      message: "Something went wrong while fetching profile",
    };
  }
};
