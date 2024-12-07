import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useBookStore } from "../../store/useBookStore.js";
import "./BookList.css";

const BookList = () => {
  const { deleteBook, toggleFeaturedBook, books } = useBookStore();
  console.log(books);

  return (
    <>
      <motion.div
        className="book-list-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="book-list-container">
          <table className="book-table">
            <thead>
              <tr className="book-table-header-row">
                <th className="book-table-header">Book Image</th>
                <th className="book-table-header">Book Name</th>
                <th className="book-table-header">Author</th>
                <th className="book-table-header">Genre</th>
                <th className="book-table-header">Price</th>
                <th className="book-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr className="book-table-row" key={book._id}>
                  <td className="book-table-cell">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="book-image"
                    />
                  </td>
                  <td className="book-table-cell">{book.title}</td>
                  <td className="book-table-cell">{book.author}</td>
                  <td className="book-table-cell">{book.genre}</td>
                  <td className="book-table-cell">${book.price}</td>
                  <td className="book-table-cell book-actions-cell">
                    <button
                      className="action-button delete-button"
                      onClick={() => deleteBook(book._id)}
                    >
                      <Trash />
                    </button>
                    <button
                      className="action-button feature-button"
                      onClick={() => toggleFeaturedBook(book._id)}
                    >
                      <Star />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default BookList;
