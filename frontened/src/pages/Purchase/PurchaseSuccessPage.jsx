import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PurchaseSuccessPage.css";

const PurchaseSuccessPage = () => {
  return (
    <div className="success-container">
      <motion.section
        className="success-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Thank You for Your Purchase!</h2>
      </motion.section>

      {/* Content Section */}
      <motion.section
        className="success-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p>Your order has been successfully placed. We appreciate your trust in us!</p>
        <p>Keep an eye on your email for the confirmation and details.</p>
        <CheckCircle className="success-icon" />
      </motion.section>

      <motion.footer
        className="success-footer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Link to="/" aria-label="Return to homepage">
          <ArrowRight className="arrow-icon" />
          <span className="link-text">Back to Home</span>
        </Link>
      </motion.footer>
    </div>
  );
};

export default PurchaseSuccessPage;
