import React, { useState, useEffect } from "react";
import "./BookSlider.css";
import homebackground from "../../assets/homebackground.jpg";

const BookSlider = () => {
  const slides = [
    {
      image: homebackground,
      quote: "A room without books is like a body without a soul. — Cicero",
    },
    {
      image: homebackground,
      quote: "Books are a uniquely portable magic. — Stephen King",
    },
    {
      image: homebackground,
      quote: "There is no friend as loyal as a book. — Ernest Hemingway",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="book-slider">
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
          <div>
            <img src={slide.image} alt={`Slide ${index}`} />
          </div>
          <p className="quote">{slide.quote}</p>
        </div>
      ))}
    </div>
  );
};

export default BookSlider;
