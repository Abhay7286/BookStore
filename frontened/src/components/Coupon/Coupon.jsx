import React, { useEffect, useState } from 'react';
import './Coupon.css';
import { motion } from "framer-motion";
import { useCartStore } from '../../store/useCartStore.js';
import toast from 'react-hot-toast';

const Coupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } = useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setCouponCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a valid coupon code!');
      return;
    }
    applyCoupon(couponCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponCode('');
  };

  return (
    <div className="coupon-wrapper">
      <div className="coupon-container">
        <h2 className="coupon-title">Apply Your Coupon</h2>
        <div className="coupon-input-group">
          <input
            type="text"
            className="coupon-input"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Coupon Code"
          />
          <motion.button
            className="coupon-button"
            onClick={handleApplyCoupon}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply
          </motion.button>
        </div>
      </div>

      {isCouponApplied && coupon && (
        <div className="applied-coupon">
          <h3>Applied Coupon</h3>
          <p>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            className="remove-coupon-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="available-coupon">
          <h3>Available Coupon</h3>
          <p>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </div>
  );
};

export default Coupon;
