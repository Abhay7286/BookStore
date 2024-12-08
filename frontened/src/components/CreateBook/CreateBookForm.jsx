import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, SpaceIcon } from "lucide-react";
import "./CreateBookForm.css";
import { useBookStore } from "../../store/useBookStore.js";

const genres = [
  "fiction",
  "novel",
  "thriller",
  "mystery",
  "horror",
  "biography",
  "self-help",
  "romance",
  "history",
  "poetry",
  "philosophy",
];

const CreateBookForm = () => {
  const [newBook, setnewBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    image: "",
    price: 0,
  });

  const { loading, addNewBook } = useBookStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewBook(newBook);
      setnewBook({
        title: "",
        author: "",
        description: "",
        genre: "",
        image: "",
        price: 0,
      });
    } catch (error) {
      console.log("error in adding new book", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setnewBook({ ...newBook, image: reader.result });
      };

      reader.readAsDataURL(file); //base64 format
    }
  };

  return (
    <div className="create-product-form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="form-title">Add New Book</h2>
        <form onSubmit={handleSubmit} className="add-new-book-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={(e) =>
                setnewBook({ ...newBook, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={(e) =>
                setnewBook({ ...newBook, author: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newBook.description}
              onChange={(e) =>
                setnewBook({ ...newBook, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={newBook.genre}
              onChange={(e) =>
                setnewBook({ ...newBook, genre: e.target.value})
              }
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newBook.price}
              onChange={(e) =>
                setnewBook({ ...newBook, price: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">
              Upload Image
              <Upload className="upload-icon" />{" "}
            </label>
            <div className="file-input">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
              />

              {newBook.image && <span>Image Uploaded</span>}
            </div>
          </div>
          <button type="submit" className="add-new-book-btn" disabled={loading}>
            {loading ? (
              <>
                {" "}
                <Loader className="loader-icon" />
              </>
            ) : (
              <>
                <PlusCircle className="plus-icon" /> Add Book
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBookForm;
