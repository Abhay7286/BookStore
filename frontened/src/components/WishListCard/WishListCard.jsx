import React from 'react'
import './wishListCard.css';
import { useWishListStore } from '../../store/useWishListStore.js';
import { useCartStore } from '../../store/useCartStore.js';
import { useEffect } from 'react';
import {CircleX } from 'lucide-react';

const WishListCard = () => {
    const { wishlist, fetchWishlist,toggleWishList } = useWishListStore();
    const { addToCart } = useCartStore();

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const handleToggle = (bookId)=>{
        toggleWishList(bookId);
        console.log("wis")
    }

    return (
        <div className="wish-card-container">
            {wishlist.map((book) => (
                <div className="wish-card" key={book._id}>
                    <CircleX size={20} onClick={()=>handleToggle(book._id)} className='remove-icon'/>
                    <svg className="wish-card-svg" viewBox="0 0 375 283">
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
                    <div className="wish-card-image-container">
                        <div className="wish-card-shadow"></div>
                        <img
                            className="wish-card-image"
                            src={book.image || "default-image-url.png"}
                            alt={book.title || "Book Cover"}
                        />
                    </div>
                    <div className="wish-card-text">
                        <span className="wish-card-title">{book.title}</span>
                        <div className="wish-card-details">
                            <span className="wish-card-author">{book.author}</span>
                            <span className="wish-card-price">${book.price || "0.00"}</span>
                            <span className="wish-card-wish">{book.genre}</span>
                        </div>
                        <div className="wish-card-button">
                            <button className="view-details">View Details</button>
                            <button className="add-to-cart" onClick={() => {addToCart(book)}}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WishListCard;
