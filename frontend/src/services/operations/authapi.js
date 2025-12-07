import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../api";
import { setLoading, setToken, setUser } from "../../slices/authSlice";

const { LOGIN, SIGNUP } = authEndpoints;

// --------------------- SIGNUP FUNCTION ---------------------
export function signUp(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP, data);
      console.log("SIGNUP API RESPONSE:", response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Signup failed");
      }

      toast.success("Signup Successful 🎉");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP API ERROR:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Signup Failed ❌"
      );
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

// --------------------- LOGIN FUNCTION ---------------------
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN, { email, password });
      console.log("LOGIN API RESPONSE:", response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Login failed");
      }

      const user = response.data.user || {};
      const token = response.data.token;

      dispatch(setToken(token));

      // Fallback for user image
      const userImage = user.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName || "User"} ${user.lastName || ""}`;

      dispatch(setUser({ ...user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(token));
      toast.success("Login Successful 🎉");
      navigate("/");
    } catch (error) {
      console.error("LOGIN API ERROR:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Login Failed ❌"
      );
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
