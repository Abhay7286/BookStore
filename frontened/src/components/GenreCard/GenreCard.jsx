import {useState} from 'react'
import './GenreCard.css';
import { useBookStore } from '../../store/useBookStore.js';
import { useWishListStore } from '../../store/useWishListStore.js';
import { useCartStore } from '../../store/useCartStore.js';
// import { Heart } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore.js';
// import toast from 'react-hot-toast';

const Genregenre = () => {
    const { books } = useBookStore();
    // const { addToCart } = useCartStore();
    // const { toggleWishList } = useWishListStore();
    const {user} = useUserStore()
    // const [wishlisted, setWishlisted] = useState(false)
    
    // const handleToggle =  (bookId) =>{
    //     if(!user){
    //         toast.error("Please Login to added wishList",{id:1})
    //     }
    //     toggleWishList(bookId)
    //     setWishlisted((prev) => !prev); // Toggle the wishlisted state
    // }

    return (
        <div className="genre-section">
        {books.map((book) => (
          <div className="genre-card" key={book._id}>
            <img src={book.image} alt={book.title} />
            <div className="genre-title">{book.title}</div>
            <div className="genre-author">{book.author}</div>
            <div className="genre-price">${book.price}</div>
          </div>
        ))}
      </div>
    )
}

export default Genregenre;
