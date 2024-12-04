import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="foot-container">
        <div className="about-us">
          <h1>BookStore</h1>
          <p>
            Embark on a literary journey with Kitabay, the online book
            wonderland nestled in Jaipur since 2018. We take pride in being
            sustainable and eco-friendly - from new releases to treasured
            pre-loved books.
          </p>
          <div className="social-media">
            <ul>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram insta"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook face"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter x"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email to get notified"
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </div>
        </div>
        <div className="footer-links">
          <div className="app-link">
            <ul>
              <li>
                <a href="#brand-story">Brand Story</a>
              </li>
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#contact-us">Contact Us</a>
              </li>
              <li>
                <a href="#blogs">Blogs</a>
              </li>
            </ul>
          </div>
          <div className="list">
            <ul>
              <li>
                <a href="#shop-now">Shop Now</a>
              </li>
              <li>
                <a href="#merchandise">Merchandise</a>
              </li>
              <li>
                <a href="#books">Books</a>
              </li>
            </ul>
          </div>
          <div className="policy">
            <ul>
              <li>
                <a href="#privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="#shipping-returns">Shipping and Returns</a>
              </li>
              <li>
                <a href="#payments-refund">Payments and Refund</a>
              </li>
              <li>
                <a href="#terms-conditions">Terms and Conditions</a>
              </li>
              <li>
                <a href="#track-order">Track your order</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
