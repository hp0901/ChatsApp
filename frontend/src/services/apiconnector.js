import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers = {}, params = {}) => {
  try {
    console.log("👉 API CALL:", method, url);
    console.log("📦 Headers Sent:", headers);

    const response = await axiosInstance({
      method,
      url,
      data: bodyData || undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params: Object.keys(params).length ? params : undefined,
    });

    console.log("✅ API RESPONSE:", response);
    return response;
  } catch (error) {
    console.error("❌ API ERROR:", error.response?.data || error.message);
    throw error;
  }
};
