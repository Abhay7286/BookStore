import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  userOrders: [],

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      if (res && res.data) {
        set({ user: res.data, loading: false });
        toast.success("Signup successful!");
      } else {
        throw new Error("No response data");
      }
    } catch (error) {
      set({ loading: false });
      return toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      if (res && res.data) {
        set({ user: res.data, loading: false });
        toast.success("Login successful!");
      } else {
        throw new Error("No response data");
      }
    } catch (error) {
      set({ loading: false });
      return toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response?.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      console.log(error.message);
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const res = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return res?.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },

  updateUser: async (user) => {
    try {
      const res = await axios.patch("/auth/profile-update", user);
      set({ user: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  updateAddress: async (address) => {
    try {
      console.log(address);
      const res = await axios.patch("/auth/address-update", address);
      set({ user: res.data });
      toast.success("Address updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  fetchUserOrders: async () => {
    try{
      const res = await axios.get("/auth/orders");
      set({ userOrders: res?.data });
    }catch(error){
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
