import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name,email,password,confirmPassword}) => {
        set({loading:true});

        if(password !== confirmPassword){
            set({loading:false});
            return toast.error( "Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup",{name,email,password});
            if (res && res.data) {
                set({user: res.data, loading: false});
                toast.success("Signup successful!");
            } else {
                throw new Error('No response data');
            }
        } catch (error) {
            set({loading:false});
            return toast.error( error.response?.data?.message ||"Something went wrong");
        }
        
    },

    login: async (email,password) => {
        set({loading:true});

        try {
            const res = await axios.post("/auth/login",{email,password});
            if (res && res.data) {
                set({user: res.data, loading: false});
                toast.success("Login successful!");
            } else {
                throw new Error('No response data');
            }
        } catch (error) {
            set({loading:false});
            return toast.error( error.response?.data?.message ||"Something went wrong");
        }
        
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({user: null});
            toast.success("Logout successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response?.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	}
    
}));