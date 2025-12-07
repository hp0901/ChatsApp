import { createSlice } from "@reduxjs/toolkit";

// Safe localStorage parsing
const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const initialState = {
  token: getLocalStorage("token"),
  user: getLocalStorage("user"),
  loading: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) localStorage.setItem("token", JSON.stringify(action.payload));
      else localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) localStorage.setItem("user", JSON.stringify(action.payload));
      else localStorage.removeItem("user");
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setSignupData, setLoading, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
