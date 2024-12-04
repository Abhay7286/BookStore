import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { ShoppingCart, LogIn, Lock, LogOut, UserPlus } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState(location.pathname);
  let isAdmin = true;
  let user = false;

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
      </ul>

      <div className="nav-login-cart">
        {user ? (
          <>
            <button>
              <Link to="/logout">
                <LogOut size={20} /> <span>Logout</span>
              </Link>
            </button>
            <button className="cart">
              <Link to="/cart">
                <ShoppingCart size={20} />
              </Link>
            </button>
            {isAdmin && (
              <button className="dashboard">
                <Link to="/dashboard">
                  <Lock size={20} /> <span>Dashboard</span>
                </Link>
              </button>
            )}
          </>
        ) : (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
