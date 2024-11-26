import React, { useState, useEffect } from "react";
import bookData from "../../hooks/bookData.js";

const Romance = () => {
  const { romance, loading } = bookData();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(romance);
  }, [romance]);
  console.log(romance)

  return (
    <>
      {books && books.map((book) => (  // Ensure books is available before mapping
        <div className="book" key={book.id}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          <div className="description">
            <div className="name">{book.volumeInfo.title}</div>
            <div className="price">$99.99</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Romance;
