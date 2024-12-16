import React, { useEffect,useState } from 'react'
import CartCard from '../../components/CartCard/CartCard';
import './Cart.css'
import { useCartStore } from '../../store/useCartStore';

const Cart = () => {
  const {total, subtotal,cart} = useCartStore()
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    setAmount(subtotal)
    setTotalAmount(total)
  }, [subtotal,total])
  
  return (


    <div className="cart-container">
      <h1 className="cart-title">Cart Items</h1>
      <div className="cart-content">
        <div className="cart-items">
          <CartCard />
        </div>

        {cart.length > 0 && <OrderSummary/>}

      </div>
    </div>
  );
};



export default Cart
