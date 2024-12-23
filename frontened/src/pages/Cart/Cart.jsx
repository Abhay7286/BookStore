import React, { useEffect } from 'react';
import CartCard from '../../components/CartCard/CartCard';
import './Cart.css';
import { useCartStore } from '../../store/useCartStore';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import RecommendedBooks from '../../components/RecommendedBooks/RecommendedBooks.jsx';
import { Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Cart = () => {
  const { cart, clearCart, getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  const handleDelete = () => {
    clearCart();
  };

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <div className="cart-head">
            <h1 className="cart-title">Cart Items</h1>
            <button className="clear-cart-button" onClick={handleDelete} aria-label="Clear Cart" title="Clear Cart">
              <Trash2 size={25} />
            </button>
          </div>
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <CartCard key={item._id} item={item} /> 
              ))}
            </div>
            <div className="cart-summary-container">
              <OrderSummary />
            </div>
          </div>
          <RecommendedBooks />
        </>
      ) : (
        <motion.div className="empty-cart" initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <ShoppingCart size={60} />
          <p>Your cart is empty! Explore books and add items to your cart.</p>
          <Link to="/">Go Back To Shopping</Link> 
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
