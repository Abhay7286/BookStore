import React, { useState } from "react";
import "./Login.css";
import loginimg from "../../assets/loginimg.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <img src={loginimg} alt="background" />
      <div className="auth-container">
        <div className="auth-card">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <form>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" required />
                </div>
              </>
            )}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" required />
              </div>
            )}
            <button type="submit" className="auth-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="toggle-link" onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
