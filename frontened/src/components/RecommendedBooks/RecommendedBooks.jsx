import { useEffect, useState } from "react";
import axios from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner/Spinner.jsx";
import { useWishListStore } from "../../store/useWishListStore.js";
import { useUserStore } from "../../store/useUserStore.js";
import { useCartStore } from "../../store/useCartStore.js";
import { Heart } from "lucide-react";
import "./RecommendedBooks.css";

const RecommendedBooks = () => {
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const { toggleWishList } = useWishListStore();

  const handleToggle = (bookId) => {
    if (!user) {
      toast.error("Please Login to added wishList", { id: 1 });
    }
    toggleWishList(bookId);
    setWishlisted((prev) => !prev);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("book/recommended");
        setRecommended(res.data);
      } catch (error) {
        toast.error(
          error.response.data.message ||
            "An error occurred while fetching recommendations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <h2>Similar Books</h2>
      <div className="recom-card-container">
        {recommended.map((book) => (
          <div className="recom-card" key={book._id}>
            <Heart
              size={20}
              className={`recom-heart ${wishlisted ? "red" : ""}`}
              onClick={() => handleToggle(book._id)}
            />
            <svg className="recom-card-svg" viewBox="0 0 375 283">
              <rect
                x="159.52"
                y="175"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
              />
              <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
              />
            </svg>
            <div className="recom-card-image-container">
              <div className="recom-card-shadow"></div>
              <img
                className="recom-card-image"
                src={book.image || "default-image-url.png"}
                alt={book.title || "Book Cover"}
              />
            </div>
            <div className="recom-card-text">
              <span className="recom-card-title">{book.title}</span>
              <div className="genre-card-details">
                <span className="recom-card-author">{book.author}</span>
                <span className="recom-card-price">
                  ${book.price || "0.00"}
                </span>
                <span className="recom-card-genre">{book.genre}</span>
              </div>
              <div className="recom-card-button">
                <button className="view-details">View Details</button>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(book._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendedBooks;
