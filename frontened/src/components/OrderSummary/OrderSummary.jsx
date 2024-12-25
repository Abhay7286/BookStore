import { useCartStore } from "../../store/useCartStore";
import "./OrderSummary.css";
import { Link } from "react-router-dom";
import axios from "../../lib/axios.js";
import { loadStripe } from "@stripe/stripe-js";
import { MoveRight } from "lucide-react";

const stripePromise = loadStripe(
  "pk_test_51QRt0QJiheEEb3bRXxtenyfHYCgYZoQFX0diqou1ZlnmJ3pTNx0ngqurhW7G8lEoEF39J9FSSfw38MUpZVeFgFLt00SuxU1nO1"
);

const OrderSummary = () => {
  const { total, subtotal, cart, coupon } = useCartStore();

  const SHIPPING_FEE = "FREE";
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
   try {
    const stripe = await stripePromise;
    const res = await axios.post("/payment/create-checkout-session", {
      books: cart,
      couponCode: coupon?.code || null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
   } catch (error) {
    console.error("Payment Error:", error.response?.data?.message || error.message);
   }
  };

  return (
    <>
      <div className="cart-summary">
        <div className="summary-row">
          <p>Subtotal</p>
          <p>{formattedSubtotal}</p>
        </div>
        {savings > 0 && (
          <div className="summary-row">
            <p>Coupon</p>
            <p>- {formattedSavings}</p>
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
        <button className="checkout-button" aria-label="Proceed to checkout" onClick={handlePayment}>
          Check out
        </button>
        <Link to="/" className="continue-link"> or Continue Shopping <MoveRight size={16} />
        </Link>
      </div>

    </>
  );
};

export default OrderSummary;
