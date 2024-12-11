import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useUserStore } from "./useUserStore.js";

// Get the current user from useUserStore
// const { user } = useUserStore.getState();

export const useWishListStore = create((set, get) => ({
  wishlist: [],

  fetchWishlist: async () => {
    try {
      const res = await axios.get(`/wishlist`);
      set({ wishlist: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  toggleWishList: async (bookId) => {
    try {
      const response = await axios.patch(`/wishlist/${bookId}`);
      const { isWishlisted } = response.data;
  
      set((prevState) => ({
        wishlist: isWishlisted
          ? prevState.wishlist // If still wishlisted, keep it
          : prevState.wishlist.filter((book) => book._id !== bookId), // Remove if not wishlisted
      }));

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update wishlist status"
      );
    }
  },
  
}));
