import React, { useState, useEffect } from "react";
import collectionBooks from "../../hooks/collectionBooks.js";

const Thriller = () => {
  const { thriller, loading } = collectionBooks();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(thriller);
  }, [thriller]);

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

export default Thriller;
