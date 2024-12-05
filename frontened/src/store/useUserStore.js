import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useUserStore = create((get,set) => ({
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
            set({user: res.data,loading:false});
            console.log(user);
            toast.success("Signup successful!");
        } catch (error) {
            set({loading:false});
            return toast.error( error.response?.data?.message ||"Something went wrong");
        }
        
    },

    login: async (email,password) => {
        set({loading:true});

        try {
            const res = await axios.post("/auth/login",{email,password});
            set({user: res.data,loading:false});
            console.log(user);
            toast.success("Login successful!");
        } catch (error) {
            set({loading:false});
            return toast.error( error.response?.data?.message ||"Something went wrong");
        }
        
    },

    checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	}
    
}))