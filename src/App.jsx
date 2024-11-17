import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Login from "./components/Login/Login";
import Store from "./components/Store/Store";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Books/Categories";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <header>
        <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

