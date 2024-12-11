import React from "react";
import "./CartCard.css";

const CartCard = () => {
  return (
    <div className="product-container">
      <div className="product-inner">
        <div className="product-card">
          <div className="product-card-header">
            <a href="#" className="product-image-link">
              <img
                className="product-imagee"
                src=""
                alt="image"
              />
              <img
                className="product-image"
                src=""
                alt="imac image"
              />
            </a>
            <label for="counter-input" className="sr-only">
              Choose quantity:
            </label>
            <div className="quantity-section">
              <div className="quantity-buttons">
                <button
                  type="button"
                  id="decrement-button"
                  className="quantity-button decrement"
                >
              
                </button>
                <input
                  type="text"
                  id="counter-input"
                  data-input-counter
                  className="quantity-input"
                  placeholder=""
                  value="2"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="counter-input"
                  className="quantity-button increment"
                >
                 
                </button>
              </div>
              <div className="price-section">
                <p className="product-price">$1,499</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
