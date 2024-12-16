import { useEffect } from "react";
import "./CartCard.css";
import { useCartStore } from "../../store/useCartStore.js";
import { CircleX } from "lucide-react";

const CartCard = () => {
  const { cart, getCartItems, removeFromCart, updateBookQuantity,coupon } = useCartStore();
  
  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const handleRemove = (bookId) => {
    removeFromCart(bookId);
    console.log("Remove item with id:", bookId);
  };

  const handleQuantityChange = (bookId, newQuantity) => {
    updateBookQuantity(bookId, newQuantity);
  };

  console.log(coupon)
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
                <span
                  className="decrement"
                  onClick={() =>
                    handleQuantityChange(book._id, book.quantity - 1)
                  }
                >
                  -
                </span>
                <input
                  type="number"
                  className="quantity-input"
                  value={book.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(book._id, Number(e.target.value))
                  }
                />
                <span
                  className="increment"
                  onClick={() =>
                    handleQuantityChange(book._id, book.quantity + 1)
                  }
                >
                  +
                </span>
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
