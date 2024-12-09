import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

const useWishList = create((set,get)=>({
    cart:[],
    wishlist:[],
    loading: false,
    
    addToWishList : async (book) =>{
        set({loading: true});
        try {
            const res = await axios.post("/wishlist",{bookId: book._id});
            toast.success("book added to wishlist");
        } catch (error) {
            toast.error("error.response.data.message" || "An error occured");
        }
    }
    
}))