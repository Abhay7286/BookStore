import React, { useEffect,useState } from 'react'
import CartCard from '../../components/CartCard/CartCard';
import './Cart.css'
import { useCartStore } from '../../store/useCartStore';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import RecommendedBooks from '../../components/RecommendedBooks/RecommendedBooks.jsx'

const Cart = () => {
  const {cart} = useCartStore()
  
  return (


    <div className="cart-container">
      <h1 className="cart-title">Cart Items</h1>
      <div className="cart-content">
        <div className="cart-items">
          <CartCard />
        </div>
        <div className="cart-summary-container">
          {cart.length>0 && <OrderSummary/>}
        </div>


      </div>
      {cart.length>0 && <RecommendedBooks/>}
    </div>
  );
};



export default Cart
