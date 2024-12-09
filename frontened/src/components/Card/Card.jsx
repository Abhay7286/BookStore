import React from "react";
import "./Card.css";
import { useBookStore } from "../../store/useBookStore.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Card = () => {
  const { featuredBooks } = useBookStore();

  return (
    <div className="card-carousel">
      <Swiper
        modules={[Navigation]}
        spaceBetween={3}
        slidesPerView={3} 
        navigation
        loop={true}
      >
        {featuredBooks.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="card">
              <svg className="card-svg" viewBox="0 0 375 283">
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
                  <span className="card-genre">{book.genre}</span>
                </div>
                <div className="card-button">
                  <button className="view-details">View Details</button>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Card;
