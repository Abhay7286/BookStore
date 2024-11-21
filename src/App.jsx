import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./page/Home/Home.jsx";
import Blog from "./page/Blog/Blog.jsx";
import Login from "./page/Login/Login.jsx";
import Store from "./page/store/Store.jsx";
import Contact from "./page/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Categories from "./page/shop/Categories.jsx";


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

