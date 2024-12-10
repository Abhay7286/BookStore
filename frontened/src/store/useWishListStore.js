import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
import {useUserStore} from "./useUserStore.js"

export const useWishListStore = create((set, get) => ({
  wishlist: [], 
  loading: false,



  toggleWishList: async (bookId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/wishlist/${bookId}`);
      set((prevState) => ({
        wishlist: prevState.wishlist.map((book) =>
          book._id === bookId
            ? { ...book, isWishlisted: response.data.isWishlisted } // Ensure consistency with the key
            : book
        ),
        loading: false,
      }));
      toast.success("Book wishlist status updated!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update wishlist status"
      );
      set({ loading: false });
    }
  },

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      // Get the current user from useUserStore
      const { user } = useUserStore.getState();
      const res = await axios.get(`/wishlist/${user._id}`);
      set({ wishlist: res?.data, loading: false });
      toast.success("Wishlist fetched successfully!",{id:"wishlist"});
    } catch (error) {
      console.error("Error fetching books:", error.response);
      toast.error(error.response?.data?.message || "Something went wrong");
      set({ loading: false });
    }
  },
}));
