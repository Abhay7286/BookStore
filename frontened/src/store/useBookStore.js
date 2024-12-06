import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";


export const useBookStore = create((set,get) => ({
    books:[],
    loading: false,

    setBooks: (books) => set({books}),


    addNewBook: async (book) =>{
        set({loading: true});
        try {
            const res = await axios.post("/book",book);
            set( (prevState) => ({
              books: [...prevState.books, res?.data],
              loading: false,
            }));
            toast.success("Book added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            set({loading: false});
        }
    }
}))