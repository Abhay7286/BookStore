import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { ShoppingCart, LogIn, Lock, LogOut, UserPlus, Heart, User } from "lucide-react";
import { useUserStore } from "../../store/useUserStore.js";
// import SearchBar from "../SearchBar/SearchBar.jsx";

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState(location.pathname);
  let { user, logout } = useUserStore();
  let isAdmin = user?.role === "admin";

  // Update the active menu whenever the location changes
  useEffect(() => {
    setMenu(location.pathname);
  }, [location]);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <h2>BookStore</h2>
      </div>

      <ul className="nav-menu">
        <li
          onClick={() => setMenu("/")}
          className={menu === "/" ? "active" : ""}
        >
          <Link to="/" aria-current={menu === "/" ? "page" : undefined}>
            Home
          </Link>
        </li>

        <li
          onClick={() => setMenu("/genre")}
          className={menu === "/genre" ? "active" : ""}
        >
          <Link>
            Genres
          </Link>
          <ul className="dropdown">
            <li>
              <Link to="/genre/fantasy">fantasy</Link>
            </li>
            <li>
              <Link to="/genre/romance">Romance</Link>
            </li>
            <li>
              <Link to="/genre/novel">Novel</Link>
            </li>
            <li>
              <Link to="/genre/self-help">Self Help</Link>
            </li>
            <li>
              <Link to="/genre/biography">biography</Link>
            </li>
            <li>
              <Link to="/genre/finance">finance</Link>
            </li>
            <li>
              <Link to="/genre/mystery">mystery</Link>
            </li>
            <li>
              <Link to="/genre/thiller">thiller</Link>
            </li>
            <li>
              <Link to="/genre/adventure">adventure</Link>
            </li>
            <li>
              <Link to="/genre/philosophy">philosophy</Link>
            </li>
            <li>
              <Link to="/genre/horror">horror</Link>
            </li>
            <li>
              <Link to="/genre/history">history</Link>
            </li>
            
          </ul>
        </li>

        <li
          onClick={() => setMenu("/author")}
          className={menu === "/author" ? "active" : ""}
        >
          <Link>
            Authors
          </Link>
          <ul className="dropdown">
            <li>
              <Link to="/author/jk-rowling">J.K. Rowling</Link>
            </li>
            <li>
              <Link to="/author/george-martin">George R.R. Martin</Link>
            </li>
            <li>
              <Link to="/author/stephen-king">Stephen King</Link>
            </li>
          </ul>
        </li>
      </ul>


      <div className="nav-login-cart">
        {user ? (
          <>
            <button className="wishlist">
              <Link to="/wishlist">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
            </button>
            <button className="cart">
              <Link to="/cart">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
            </button>
            <button className="profile">
              <Link to="/profile">
                <User size={20} />
                <span>Profile</span>
              </Link>
            </button>
            <button onClick={logout}>
              <Link to="/logout">
                <LogOut size={20} />
                <span>Logout</span>
              </Link>
            </button>
            {isAdmin && (
              <button className="dashboard">
                <Link to="/secret-dashboard">
                  <Lock size={20} /> <span>Dashboard</span>
                </Link>
              </button>
            )}
          </>
        ) : (
          <>
            <button>
              <Link to="/login">
                <LogIn size={20} /> <span>Login</span>
              </Link>
            </button>
            <button>
              <Link to="/signup">
                <UserPlus size={20} /> <span>Signup</span>
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
