import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../../store/useBookStore";
import "./Popular.css";

const genres = [
  "romance",
  "fantasy",
  "mystery",
  "biography",
  "self-help",
  "novel",
  "thriller",
  "adventure",
  "philosophy",
];

const Popular = () => {
  const [selectedGenre, setSelectedGenre] = useState("romance");
  const { fetchBooksByGenre, books } = useBookStore();

  useEffect(() => {
    fetchBooksByGenre(selectedGenre);
  }, [selectedGenre, fetchBooksByGenre]);


  return (
    <div className="popular-collection">
      <div className="popular-head">
        <h1>Popular Collection</h1>
        <div className="links">
          {genres.map((genre) => (
            <li key={genre} onClick={() => setSelectedGenre(genre)}>
              <Link>
                {genre} {selectedGenre === genre ? <hr /> : ""}
              </Link>
            </li>
          ))}
          <li>
          <Link to={`/genre/${selectedGenre}`}>View all &rarr;</Link>
          </li>
        </div>
      </div>

      <div className="popular-section">
        {books.map((book) => (
          <div className="popular-card" key={book._id}>
            <img src={book.image} alt={book.title} />
            <div className="popular-title">{book.title}</div>
            <div className="popular-author">{book.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
