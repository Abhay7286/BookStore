import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";

function App() {
  const {user,checkAuth,checkingAuth} = useUserStore();
  console.log(user,checkingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}/>
				<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      </Routes>
      <Footer/>
      <Toaster />
    </div>
  )
}

export default App
