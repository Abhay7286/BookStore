import { useEffect } from "react";
import "./CartCard.css";
import { useCartStore } from "../../store/useCartStore.js";
import { CircleX } from "lucide-react";

const CartCard = () => {
  const { cart, getCartItems, removeFromCart, updateBookQuantity,coupon,getMyCoupon } = useCartStore();
  
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  // useEffect(() => {
  //   getMyCoupon();
  // }, []);
 

  const handleRemove = (bookId) => {
    removeFromCart(bookId);
  };

  const handleQuantityChange = (bookId, newQuantity) => {
    updateBookQuantity(bookId, newQuantity);
  };

  return (
    <div className="cart-item">
      {cart.map((book) => (
        <div key={book._id} className="cart-item-container">
          <img
            src={book.image || "default-image-url.png"}
            alt="product"
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <div>
              <h2 className="cart-item-title">{book.title}</h2>
              <p className="cart-item-size">{book.author}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  className="decrement"
                  onClick={() =>
                    handleQuantityChange(book._id, book.quantity - 1)
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  className="quantity-input"
                  value={book.quantity}
                  min="1"
                />
                <button
                  className="increment"
                  onClick={() =>
                    handleQuantityChange(book._id, book.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="price-remove">
                <p className="price">${book.price}</p>
                <CircleX size={20} onClick={() => handleRemove(book._id)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;
