import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setLoading] = useState(false);
  const [bestBooks, setBestBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const API_KEY = "AIzaSyBGr0yc3hwMzyKN8hLO5bFUnMrSx8JlSyw"; 

      try {
        const bestBooksRes = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=best+books&key=${API_KEY}`
        );
        const bestBooksData = await bestBooksRes.json();
        setBestBooks(bestBooksData.items || []);

      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { loading, bestBooks };
};

export default bookData;
