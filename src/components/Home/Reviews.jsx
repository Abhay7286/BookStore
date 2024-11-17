import React, { useState, useEffect } from "react";
import krsna from "../../assets/krsna.png";
import cuteboy  from "../../assets/cuteboy.png";
import reading from "../../assets/reading.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./Reviews.css"; 

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      image: krsna,
      text: `"I recently visited this bookstore and was thoroughly impressed by
            the wide selection of titles available. The staff was knowledgeable
            and helped me find exactly what I was looking for. The cozy
            atmosphere made it a perfect place to browse and discover new books.
            I’ll definitely be returning soon!"`,
    },
    {
      id: 2,
      image: krsna, 
      text: `"An incredible selection of books with a warm and inviting atmosphere. Highly recommend for any book lover!"`,
    },
    {
      id: 3,
      image: krsna, 
      text: `"A true gem of a bookstore! Friendly staff, great recommendations, and a peaceful environment. Can't wait to visit again!"`,
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  // Automatically change the review every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Move to the next review
  const goToNextReview = () => {
    setCurrentReview((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Move to the previous review
  const goToPreviousReview = () => {
    setCurrentReview(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="reviewsContainer">
      <div className="reviews-head">
        <h1>What Readers Are Saying</h1>
        <div className="button">
          <button className="left" onClick={goToPreviousReview}>
            &larr;
          </button>
          <button className="right" onClick={goToNextReview}>
            &rarr;
          </button>
        </div>
      </div>
      <div className="reviews-card">
        <div className="person">
          <img src={cuteboy} alt="cuteperson" />
        </div>
        <div className="review-content">{reviews[currentReview].text}
          <div className="review-info">
          <div className="review-user">
            <img src={reviews[currentReview].image} alt="people" className="userimg" />
            <div className="name">John Doe</div>
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <img src={reading} alt="reading" className="readimg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;


