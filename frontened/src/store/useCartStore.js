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
      set({ cart: res.data });
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
      // console.log(bookId)
      const res = await axios.post("/cart", { bookId: bookId });

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === book._id
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === book._id
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
      await axios.delete("/cart", { bookId });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== bookId),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error("Failed to removing product from cart");
      console.error(error.response);
    }
  },

  updateBookQuantity: async (bookId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(bookId);
      return;
    }

    await axios.put(`/cart/${bookId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === bookId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
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
