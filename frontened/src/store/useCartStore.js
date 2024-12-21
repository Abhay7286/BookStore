import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupon");
      set({coupon: response?.data})
    } catch (error) {
      console.log("Errror in fetching coupon")
    }
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res?.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "Failed to fetch cart items");
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  addToCart: async (bookId) => {
    try {
      const response = await axios.post("/cart", { bookId });
      const book = response.data;

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === bookId);
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === bookId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...book, quantity: 1 }];

        return { cart: newCart };
      });

      toast.success("Product added to cart");
      get().calculateTotals();
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error(error.response);
    }
  },

  removeFromCart: async (bookId) => {
    try {
      await axios.delete("/cart", { data: { bookId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== bookId),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error("Failed to removing product from cart",{id:1});
      console.error(error.response);
    }
  },

  updateBookQuantity: async (bookId, quantity) => {
    try {
      // Remove the book if the quantity is zero
      // if (quantity === 0) {
      //   get().removeFromCart(bookId);
      //   return;
      // }

      const bookExists = get().cart.some((item) => item._id === bookId);
      if (!bookExists) {
        console.error(`Book with ID ${bookId} does not exist in the cart.`);
        return;
      }
  
      // Send the update request to the server
      await axios.put(`/cart/${bookId}`, { quantity });
  
      // Update the cart in the state
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === bookId ? { ...item, quantity } : item
        ),
      }));
  
      // Recalculate totals after updating
      get().calculateTotals();
    } catch (error) {
      console.error(`Failed to update quantity for book with ID ${bookId}:`, error);
    }
  },
  

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
