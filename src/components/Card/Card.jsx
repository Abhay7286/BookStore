import React, { useState, useEffect } from "react";
import "./Card.css";
import bookData from "../../hooks/bookData.js";

const Card = () => {
  const { harryPotter, loading } = bookData();

  const [books, setbooks] = useState([]);

  useEffect(() => {
    if (harryPotter) setbooks(harryPotter);
  }, [harryPotter]);

  return (
    // <>
    //   {books && books.map((book) => (
    //     <div className="card" key={book.id}>
    //       <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
    //       <div className="card-content">
    //         <div className="title">{book.volumeInfo.title}</div>
    //         <div className="price">$99.99</div>
    //         <div className="book-name">{book.title}</div>
    //         <div className="card-buttons">
    //           <button className="card-btn">{book.volumeInfo.categories}</button>
    //           <button className="cart-btn">Add to Cart</button>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </>

    <>
      {loading ? (
        <p>Loading books...</p>
      ) : books.length > 0 ? (
        books.map((book) => (
          <div className="card" key={book.id}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
            />
            <div className="card-content">
              <div className="title">{book.volumeInfo.title}</div>
              <div className="price">$99.99</div>
              <div className="book-name">{book.title}</div>
              <div className="card-buttons">
                <button className="card-btn">
                  {book.volumeInfo.categories}
                </button>
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No new arrival books available.</p>
      )}
    </>
  );
};

export default Card;
