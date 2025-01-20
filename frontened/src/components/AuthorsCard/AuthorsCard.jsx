import React from 'react';
import './AuthorsCard.css';

const AuthorsCard = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books available</p>; 
  }

  return (
    <>
      {books.map((book) => (
        <div className="author-card" key={book._id}>
          <img src={book.image} alt={book.title} className="author-image" />
          <div className="author-details">
            <h3 className="author-book-title">{book.title}</h3>
            <p className="author-book-author">{book.author}</p>
            <p className="author-book-price">${book.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorsCard;
