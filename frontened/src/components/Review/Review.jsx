import React, { useState, useEffect } from "react";
import krsna from "../../assets/krsna.png";
import cuteboy from "../../assets/cuteboy.png";
import reading from "../../assets/reading.png";
import { Star } from 'lucide-react';
import "./Review.css";


const Stars = ({ rating }) => (
  <div className="star">
    {[...Array(5)].map((_, i) => (
      <Star key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />
    ))}
  </div>
);

const Review = () => {
  const reviews = [
    {
      id: 1,
      image: krsna,
      text: "I recently visited this bookstore and was thoroughly impressed...",
      name: "Jane Smith",
      rating: 5,
    },
    {
      id: 2,
      image: cuteboy,
      text: "An incredible selection of books with a warm and inviting atmosphere...",
      name: "John Doe",
      rating: 4,
    },
    {
      id: 3,
      image: reading,
      text: "A true gem of a bookstore! Friendly staff, great recommendations...",
      name: "Emma Brown",
      rating: 5,
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const goToNextReview = () => {
    setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPreviousReview = () => {
    setCurrentReview((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="reviewsContainer">
      <div className="reviews-head">
        <h1>What Readers Are Saying</h1>
        <div className="button">
          <button className="left" onClick={goToPreviousReview} aria-label="Previous review">
            &larr;
          </button>
          <button className="right" onClick={goToNextReview} aria-label="Next review">
            &rarr;
          </button>
        </div>
      </div>
      <div className="reviews-card">
        <div className="person">
          <img src={reviews[currentReview].image} alt={reviews[currentReview].name} />
        </div>
        <div className="review-content">
          {reviews[currentReview].text}
          <div className="review-info">
            <div className="review-user">
              <div className="name">{reviews[currentReview].name}</div>
            </div>
            <Stars rating={reviews[currentReview].rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
