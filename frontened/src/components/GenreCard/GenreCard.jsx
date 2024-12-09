import React from 'react'
import './GenreCard.css';
import { useBookStore } from '../../store/useBookStore';

const Genregenre = () => {
    const {books} = useBookStore();
    console.log(books);
    return (
        <div className="genre-card-container">
            {books.map((book) => (
                <div className="genre-card" key={book._id}>
                    <svg className="genre-card-svg" viewBox="0 0 375 283">
                        <rect
                            x="159.52"
                            y="175"
                            width="152"
                            height="152"
                            rx="8"
                            transform="rotate(-45 159.52 175)"
                            fill="white"
                        />
                        <rect
                            y="107.48"
                            width="152"
                            height="152"
                            rx="8"
                            transform="rotate(-45 0 107.48)"
                            fill="white"
                        />
                    </svg>
                    <div className="genre-card-image-container">
                        <div className="genre-card-shadow"></div>
                        <img
                            className="genre-card-image"
                            src={book.image || "default-image-url.png"}
                            alt={book.title || "Book Cover"}
                        />
                    </div>
                    <div className="genre-card-text">
                        <span className="genre-card-title">{book.title}</span>
                        <div className="genre-card-details">
                            <span className="genre-card-author">{book.author}</span>
                            <span className="genre-card-price">${book.price || "0.00"}</span>
                            <span className="genre-card-genre">{book.genre}</span>
                        </div>
                        <div className="genre-card-button">
                            <button className="view-details">View Details</button>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Genregenre;
