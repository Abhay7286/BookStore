import { React, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import cart from '../../assets/cart.svg';
import person from '../../assets/person.svg';

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState(location.pathname);

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
          onClick={() => setMenu("/categories")}
          className={menu === "/categories" ? "active" : ""}
        >
          <Link to="/categories" aria-current={menu === "/categories" ? "page" : undefined}>
            Categories
          </Link>
        </li>
        <li
          onClick={() => setMenu("/store")}
          className={menu === "/store" ? "active" : ""}
        >
          <Link to="/store" aria-current={menu === "/store" ? "page" : undefined}>
            Store
          </Link>
        </li>
        <li
          onClick={() => setMenu("/contact")}
          className={menu === "/contact" ? "active" : ""}
        >
          <Link to="/contact" aria-current={menu === "/contact" ? "page" : undefined}>
            Contact
          </Link>
        </li>
        <li
          onClick={() => setMenu("/blog")}
          className={menu === "/blog" ? "active" : ""}
        >
          <Link to="/blog" aria-current={menu === "/blog" ? "page" : undefined}>
            Blog
          </Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        <button>
          <Link to='/login'>
            <img src={person} alt="person" /> Login
          </Link>
        </button>
        <button className="cart">
          <Link to='/cart'>
            <img src={cart} alt="cart" />
            {/* <div className="nav-cart-count">$56.00</div> */}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
