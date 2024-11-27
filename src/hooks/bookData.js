import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setLoading] = useState(false);
  const [bestBooks, setBestBooks] = useState([]);
  const [harryPotter, setHarryPotter] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const API_KEY = "AIzaSyBGr0yc3hwMzyKN8hLO5bFUnMrSx8JlSyw"; 

      try {
        const [bestBooksRes, harryPotterRes] = await Promise.all([
          fetch(`https://www.googleapis.com/books/v1/volumes?q=best+books&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${API_KEY}`),
        ]);

        const harryPotterData = await harryPotterRes.json();
        const bestBooksData = await bestBooksRes.json();

        setHarryPotter(harryPotterData.items);
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

  return { loading, bestBooks,harryPotter };
};

export default bookData;
