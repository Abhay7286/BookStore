import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setloading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setloading(true);
    const fetchbooks = async () => {
      try {
        const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=best+books");

        const data = await res.json();
        setBooks(data.items);
      } catch (error) {
        console.log("error in bookData hooks", error.message);
        toast.error("error in fetching books");
      } finally {
        setloading(false);
      }
    };

    fetchbooks();
  }, []);

  return { loading, books };
};

export default bookData;
