import React from 'react';
import { motion } from 'framer-motion';
import WishListCard from '../../components/WishListCard/WishListCard.jsx';

const WishList = () => {
  return (
    <>
      <motion.h2
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
        WishList
      </motion.h2>

      <WishListCard/>
    </>
  )
}

export default WishList
