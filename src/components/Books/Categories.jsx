import React, { useState } from 'react';
import "./Categories.css";
import "../Home/Card.css";
import ikagai from '../../assets/ikagai.jpg'; // Adjust the image path accordingly

const Categories = () => {
  
  const storedBook = [
    { id: 1, title: 'Book 1', genre: 'fiction', author: 'J.K. Rowling', price: 15 },
    { id: 2, title: 'Book 2', genre: 'science', author: 'George Orwell', price: 20 },
    { id: 3, title: 'Book 3', genre: 'fantasy', author: 'J.K. Rowling', price: 25 },
  
  ];

  const [books, setBooks] = useState(storedBook);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter by genre
  const filterByGenre = (genre) => {
    if (genre) {
      const filtered = storedBook.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
      setBooks(filtered);
    } else {
      setBooks(storedBook); // Reset to all books
    }
  };

  // Filter by author
  const filterByAuthor = (author) => {
    if (author) {
      const filtered = storedBook.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks(storedBook); // Reset to all books
    }
  };

  // Filter by price
  const filterByPrice = (maxPrice) => {
    if (maxPrice) {
      const filtered = storedBook.filter((book) => book.price <= maxPrice);
      setBooks(filtered);
    } else {
      setBooks(storedBook); // Reset to all books
    }
  };

  // Search books by title
  const handleSearch = () => {
    if (searchTerm) {
      const filtered = storedBook.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks(storedBook); // Reset to all books
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
              {['fiction', 'non-fiction', 'science', 'mystery', 'fantasy'].map((cat) => (
                <li key={cat}>
                  <button onClick={() => filterByGenre(cat)}>{cat}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Filters</h3>
            <label htmlFor="author">Author:</label>
            <select name="author" id="author" onChange={(e) => filterByAuthor(e.target.value)}>
              <option value="">All</option>
              <option value="Marcus Aurelius">Marcus Aurelius</option>
              <option value="J.K. Rowling">J.K. Rowling</option>
              <option value="George Orwell">George Orwell</option>
            </select>
          </div>

          <div className="categories-section">
            <h3>Price</h3>
            <ul className="categories-list">
              {[10, 20, 30].map((price) => (
                <li key={price}>
                  <button onClick={() => filterByPrice(price)}>Up to ₹{price}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="BookContainer">
          {books && books.map((book) => (
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
        </div>
      </div>
    </>
  );
};

export default Categories;
