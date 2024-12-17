import { useCartStore } from "../../store/useCartStore";
import "./OrderSummary.css";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const { total, subtotal } = useCartStore();

  const SHIPPING_FEE = "FREE";
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <>
      <div className="cart-summary">
        <div className="summary-row">
          <p>Subtotal</p>
          <p>{formattedSubtotal}</p>
        </div>
        {savings > 0 && (
          <div className="summary-row">
            <p>Shipping</p>
            <p>{formattedSavings}</p>
          </div>
        )}
        <div className="summary-row">
          <p>Shipping Charges</p>
          <p>{SHIPPING_FEE}</p>
        </div>
        <hr className="summary-divider" />
        <div className="summary-total">
          <p>Total</p>
          <div>
            <p className="total-amount">{formattedTotal}</p>
            <p className="vat-included">including VAT</p>
          </div>
        </div>
        <button className="checkout-button" aria-label="Proceed to checkout">
          Check out
        </button>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <input type="text" value="" placeholder="Enter Coupon Code" />
          <button type="button">Apply</button>
        </div>
        <hr className="summary-divider" />
        <button className="checkout-button" aria-label="Proceed to checkout">
          <Link to='/'>Continue Shopping</Link>
        </button>
      </div>

    </>
  );
};

export default OrderSummary;
