import { ArrowRight, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PurchaseFailedPage.css";

const PurchaseFailedPage = () => {
  return (
    <div className="failed-container">
      <motion.section
        className="failed-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Oops! Something Went Wrong</h2>
      </motion.section>

      <motion.section
        className="failed-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p>We couldn't process your payment. Please try again later.</p>
        <p>If the issue persists, contact support for assistance.</p>
        <XCircle className="failed-icon" />
      </motion.section>

      <motion.footer
        className="failed-footer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Link to="/" aria-label="Return to homepage">
          <ArrowRight className="arrow-icon" />
          <span className="link-text">Go Back to Home</span>
        </Link>
      </motion.footer>
    </div>
  );
};

export default PurchaseFailedPage;
