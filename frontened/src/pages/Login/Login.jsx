import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import "./Login.css";
import { useUserStore } from "../../store/useUserStore.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
    login( email, password );
  };

  return (
    <div className="login-container">
      <motion.div
        className="signup-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Create Your Account</h2>
      </motion.div>

      <motion.div
        className="login-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="login-input">
            <Mail className="login-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="login-input">
            <Lock className="login-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <Loader className="loader-icon" aria-hidden="true" />
                <span className="loader-text">Loading...</span>
              </>
            ) : (
              <>
                <LogIn className="icon" aria-hidden="true" />
                <span className="btn-text">Login</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      <div className="login-footer">
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
