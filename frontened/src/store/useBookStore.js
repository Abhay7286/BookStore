import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";


export const useBookStore = create((set,get) => ({
    books:[],
    featuredBooks:[],
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
    },
    fetchAllBooks: async () => {
       set({loading: true});
       try {
        const res = await axios.get("/book");
        set({books: res?.data?.books, loading: false});
       } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        set({loading: false});
       } 
    },

    deleteBook : async(bookId) =>{
        set({loading: true});
        try {
            await axios.delete(`/book/${bookId}`);

            set((prevState) => ({
                books: prevState.books.filter((book)=> book._id !== bookId),
                loading: false
            }))
            
        } catch (error) {
            set({loading: false});
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    toggleFeaturedBook: async (bookId) => {
        set({ loading: true }); 
        try {
          const response = await axios.patch(`/book/${bookId}`);
      
          set((prevState) => ({
            books: prevState.books.map((book) =>
              book._id === bookId
                ? { ...book, isFeatured: response.data.isFeatured } 
                : book
            ),
            loading: false, 
          }));
      
          toast.success("Book feature status updated!");
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to update feature status"
          );
          set({ loading: false });
        }
      },

      fetchFeaturedBooks: async () => {
        set({ loading: true });
        try {
          const res = await axios.get("/book/featured");
          set({ featuredBooks: res?.data, loading: false });
        } catch (error) {
          console.error("Error fetching books:", error.response);
          toast.error(error.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
        
      },

      fetchBooksByGenre: async (genre) => {
        set({ loading: true });
        try {
          const res = await axios.get(`/book/genre/${genre}`);
          set({books: res?.data , loading: false});
        } catch (error) {
          console.error("Error fetching books:", error.response);
          toast.error(error.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
        
      },
      
      
}))