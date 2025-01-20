import { useCallback } from "react";
import "./Card.css";
import { useBookStore } from "../../store/useBookStore.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useWishListStore } from "../../store/useWishListStore.js";
import { useCartStore } from "../../store/useCartStore.js";
import { Heart } from "lucide-react";
import { useUserStore } from "../../store/useUserStore.js";

const Card = () => {
  const { featuredBooks } = useBookStore();
  const { toggleWishList } = useWishListStore();
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const handleToggle = useCallback(
    (bookId) => {
      toggleWishList(bookId)
    }
  )

  return (
    <div className="card-carousel">
      <Swiper
        modules={[Navigation]}
        spaceBetween={3}
        slidesPerView={4}
        navigation
        loop={true}
      >
        {featuredBooks.map((book) => {
          const isWishlisted = user?.wishList?.some((item) => item.book === book._id);

          return (
            <SwiperSlide key={book._id}>
              <div className="card">
                <Heart
                  size={20}
                  className={`card-heart ${isWishlisted ? "red" : ""}`}
                  onClick={() => handleToggle(book._id)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                />
                <div className="card-image-container">
                  <div className="card-shadow"></div>
                  <img
                    className="card-image"
                    src={book.image || "default-image-url.png"}
                    alt={book.title || "Book Cover"}
                  />
                </div>
                <div className="card-text">
                  <span className="card-title">{book.title}</span>
                  <div className="card-details">
                    <span className="card-author">{book.author}</span>
                    <span className="card-price">${book.price || "0.00"}</span>
                  </div>
                  <div className="card-button">
                    <button className="add-to-cart" onClick={() => addToCart(book._id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Card;
