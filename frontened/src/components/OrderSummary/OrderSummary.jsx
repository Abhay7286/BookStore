import OrderSummary from "./OrderSummary.css";

const OrderSummary = () => {
  const { total, subtotal, cart } = useCartStore();
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setAmount(subtotal);
    setTotalAmount(total);
  }, [subtotal, total]);
  
  return (
    <div className="cart-summary">
      <div className="summary-row">
        <p>Subtotal</p>
        <p>${amount}</p>
      </div>
      <div className="summary-row">
        <p>Shipping</p>
        <p>$4.99</p>
      </div>
      <hr className="summary-divider" />
      <div className="summary-total">
        <p>Total</p>
        <div>
          <p className="total-amount">${totalAmount}</p>
          <p className="vat-included">including VAT</p>
        </div>
      </div>
      <button className="checkout-button">Check out</button>
    </div>
  );
};

export default OrderSummary;
