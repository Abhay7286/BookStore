import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";
import Spinner from "./components/spinner/spinner.jsx";
import Genre from "./pages/Category/Genre.jsx";

function App() {
  const {user,checkAuth,checkingAuth} = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (checkingAuth) return <Spinner />
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/genre" element={<Genre />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}/>
				<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/secret-dashboard' element={user?.role === 'admin' ? <Admin /> : <Navigate to='/login' />} />
      </Routes>
      <Footer/>
      <Toaster />
    </div>
  )
}

export default App
