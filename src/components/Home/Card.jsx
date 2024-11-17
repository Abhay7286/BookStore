import React, { useState } from 'react';
import './Card.css';
import ikagai from '../../assets/ikagai.jpg';

const Card = () => {
  const storedBook = [
    {
        "id": 1,
        "title": "The Silent Ocean",
        "author": "John Carter",
        "genre": "Adventure",
        "price": 299,
        "publishedYear": 2015,
        "rating": 4.5,
        "stock": 50
    },
    {
        "id": 2,
        "title": "The Hidden Path",
        "author": "Emma Walker",
        "genre": "Mystery",
        "price": 450,
        "publishedYear": 2018,
        "rating": 4.7,
        "stock": 35
    },
    {
        "id": 3,
        "title": "Future World",
        "author": "James O'Neil",
        "genre": "Science Fiction",
        "price": 399,
        "publishedYear": 2020,
        "rating": 4.3,
        "stock": 80
    },
];
const [books, setbooks] = useState(storedBook)


  return (
    <>
      {books && books.map((book) => (  // Ensure books is available before mapping
        <div className="card" key={book.id}>
          <img src={ikagai} alt={book.title} />
          <div className="card-content">
            <div className="title">{book.title}</div>
            <div className="price">₹{book.price}</div>
            <div className="book-name">{book.title}</div>
            <div className="card-buttons">
              <button className="card-btn">{book.genre}</button>
              <button className="cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
