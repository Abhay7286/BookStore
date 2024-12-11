import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
    } catch (error) {
      set({ cart: [] });
      toast.error("Failed to fetch cart items");
    }
  },

  addToCart: async (book) => {
    try {
      await axios.post("/cart", { bookId: book });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item.book._id === book._id
        );

        let newCart;
        if (existingItem) {
          // Update quantity if the item already exists
          newCart = prevState.cart.map((item) =>
            item.book._id === book._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Add new item to the cart
          newCart = [...prevState.cart, { book, quantity: 1 }];
        }

        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
  },

  calculateTotals: () => {
    const {cart,coupon} = get();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;

    if(coupon){
        const discount = subtotal * (coupon.discountPercentage / 100);
        total = subtotal - discount;
    }

    set({subtotal,total});
  },

}));
