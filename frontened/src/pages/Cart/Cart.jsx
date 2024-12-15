import React from 'react'
import CartCard from '../../components/CartCard/CartCard';
import './Cart.css'
import { useCartStore } from '../../store/useCartStore';

const Cart = () => {
  const {total, subtotal} = useCartStore()
  return (


    <div className="cart-container">
      <h1 className="cart-title">Cart Items</h1>
      <div className="cart-content">
        <div className="cart-items">
          <CartCard />
        </div>

        {/* Subtotal Section */}
        <div className="cart-summary">
          <div className="summary-row">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="summary-row">
            <p>Shipping</p>
            <p>$4.99</p>
          </div>
          <hr className="summary-divider" />
          <div className="summary-total">
            <p>{total}</p>
            <div>
              <p className="total-amount">${total}</p>
              <p className="vat-included">including VAT</p>
            </div>
          </div>
          <button className="checkout-button">Check out</button>
        </div>
      </div>
    </div>
  );
};



export default Cart
