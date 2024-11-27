import React, { useState, useEffect } from "react";
import collectionBooks from "../../hooks/collectionBooks.js";

const Romance = () => {
  const { romance, loading } = collectionBooks();
  const [books, setBooks] = useState([]);

  useEffect(() => {
   if (romance) setBooks(romance);
  }, [romance]);

  return (
    <>
    {loading ? (
      <p>Loading books...</p>
    ) : books.length > 0 ? (
      books.map((book) => (
        <div className="book" key={book.id}>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
          />
          <div className="description">
            <div className="name">{book.volumeInfo.title}</div>
            <div className="price">$99.99</div>
          </div>
        </div>
      ))
    ) : (
      <p>No thriller books available.</p>
    )}
  </>
  );
};

export default Romance;
