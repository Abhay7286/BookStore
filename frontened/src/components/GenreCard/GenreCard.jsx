import {useState} from 'react'
import './GenreCard.css';
import { useBookStore } from '../../store/useBookStore.js';
import { useWishListStore } from '../../store/useWishListStore.js';
import { useCartStore } from '../../store/useCartStore.js';
import { useUserStore } from '../../store/useUserStore.js';

const Genregenre = ({book}) => {

  if (!book || book.length === 0) {
    return <h3>No book available for this genre</h3>
    
  }
    return (
        <div className="genre-section" >
          <div className="genre-card" key={book._id}>
            <img src={book.image} alt={book.title} />
            <div className="genre-title">{book.title}</div>
            <div className="genre-author">{book.author}</div>
            <div className="genre-price">${book.price}</div>
          </div>
      </div>
    )
}

export default Genregenre;
