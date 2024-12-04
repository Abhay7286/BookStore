import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, UserPlus, Loader } from "lucide-react";
import { motion } from "framer-motion";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const loading = false;

  return (
    <div className="signup-container">
      <motion.div
        className="signup-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Create Your Account</h2>
      </motion.div>

      <motion.div
        className="signup-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-input">
            <User className="signup-icon" />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="signup-input">
            <Mail className="signup-icon" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="signup-input">
            <Lock className="signup-icon" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="signup-input">
            <Lock className="signup-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? (
              <>
                <Loader className="loader-icon" aria-hidden="true" />
                <span className="loader-text">Loading...</span>
              </>
            ) : (
              <>
                <UserPlus className="icon" aria-hidden="true" />
                <span className="btn-text">Sign up</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      <div className="signup-footer">
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
