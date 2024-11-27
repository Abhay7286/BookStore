import React, { useState, useEffect } from "react";
import collectionBooks from "../../hooks/collectionBooks.js";

const Fantasy = () => {
  const { fantasy, loading } = collectionBooks();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(fantasy);
  }, [fantasy]);

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

export default Fantasy;
