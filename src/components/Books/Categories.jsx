import React, { useState, useEffect } from "react";
import "./Categories.css";
import "../Home/Card.css";
import ikagai from "../../assets/ikagai.jpg";
import bookData from "../../hooks/bookData.js";

const Categories = () => {
  const { books: fetchedBooks, loading } = bookData();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Set books from fetched data
  useEffect(() => {
    setBooks(fetchedBooks);
  }, [fetchedBooks]);

  // Filter by genre
  const filterByGenre = (genre) => {
    if (genre) {
      const filtered = fetchedBooks.filter((book) =>
        book.volumeInfo.categories?.some(
          (cat) => cat.toLowerCase() === genre.toLowerCase()
        )
      );
      setBooks(filtered);
    } else {
      setBooks(fetchedBooks);
    }
  };

  // Filter by author
  const filterByAuthor = (author) => {
    if (author) {
      const filtered = fetchedBooks.filter((book) =>
        book.volumeInfo.authors?.some((auth) =>
          auth.toLowerCase().includes(author.toLowerCase())
        )
      );
      setBooks(filtered);
    } else {
      setBooks(fetchedBooks);
    }
  };

  // Search books by title
  const handleSearch = () => {
    if (searchTerm) {
      const filtered = fetchedBooks.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks(fetchedBooks);
    }
  };

  return (
    <>
      <div className="search-ebar">
        <input
          type="search"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" className="searchbtne" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="Container">
        <div className="filterContainer">
          <div className="categories-section">
            <h3>Categories</h3>
            <ul className="categories-list">
              {["Fiction", "Non-fiction", "Science", "Mystery", "Fantasy"].map(
                (cat) => (
                  <li key={cat}>
                    <button onClick={() => filterByGenre(cat)}>{cat}</button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Filters</h3>
            <label htmlFor="author">Author:</label>
            <select
              name="author"
              id="author"
              onChange={(e) => filterByAuthor(e.target.value)}
            >
              <option value="">All</option>
              <option value="Marcus Aurelius">Marcus Aurelius</option>
              <option value="J.K. Rowling">J.K. Rowling</option>
              <option value="George Orwell">George Orwell</option>
            </select>
          </div>
        </div>

        <div className="BookContainer">
          {loading ? (
            <p>Loading...</p>
          ) : books && books.length > 0 ? (
            books.map((book) => (
              <div className="card" key={book.id}>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || ikagai}
                  alt={book.volumeInfo.title}
                />
                <div className="card-content">
                  <div className="title">{book.volumeInfo.title}</div>
                  <div className="author">
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "Unknown Author"}
                  </div>
                  <div className="card-buttons">
                    <button className="card-btn">Details</button>
                    <button className="cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
