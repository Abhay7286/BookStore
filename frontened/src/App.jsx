import { Route, Routes } from "react-router-dom";
import Home from "./pages//Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Navbar from "./components//Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
