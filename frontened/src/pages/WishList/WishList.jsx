import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GenreCard from "../../components/GenreCard/GenreCard.jsx";
import { useWishListStore } from "../../store/useWishListStore.js";
import { CircleX, Heart } from "lucide-react";
import "./WishList.css";

const WishList = () => {
  const { wishlist, fetchWishlist, toggleWishList } = useWishListStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleToggle = (bookId) => {
    toggleWishList(bookId);
  };

  return (
    <div className="wishlist-container">
      {wishlist && wishlist.length > 0 ? (
        <div className="WishList-Body" style={{ minHeight: "100vh" }}>
          <motion.h2
            style={{ textAlign: "center", marginTop: "1em" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            WishList
          </motion.h2>

          <div
            className="card-container"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {wishlist.map((book) => (
              <div key={book._id} className="wishlist-item">
                <CircleX
                  size={20}
                  onClick={() => handleToggle(book._id)}
                  className="remove-icon"
                  aria-label="Remove from wishlist"
                />
                <GenreCard book={book} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="empty-wishlist"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Heart size={60} />
          <p>Your wishlist is empty! Explore books and add items to your wishlist.</p>
          <Link to="/">Go Back To Shopping</Link>
        </motion.div>
      )}
    </div>
  );
};

export default WishList;
