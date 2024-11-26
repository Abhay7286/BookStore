import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setLoading] = useState(false);
  const [bestBooks, setBestBooks] = useState([]);
  const [harryPotter, setHarryPotter] = useState([]);
  const [romance, setRomance] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [bio, setBio] = useState([]);
  const [selfHelp, setSelfHelp] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Fetch data concurrently
        const [bestBooksRes, harryPotterRes, romanceRes,thrillerRes,fantasyRes,bioRes,selfHelpRes,childrenRes] = await Promise.all([
          fetch("https://www.googleapis.com/books/v1/volumes?q=best+books"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=harry+potter"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=romance"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=thriller"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=fantasy"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=biography"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=self-help"),
          fetch("https://www.googleapis.com/books/v1/volumes?q=children"),
          
        ]);

        const bestBooksData = await bestBooksRes.json();
        const harryPotterData = await harryPotterRes.json();
        const romanceData = await romanceRes.json();
        const thrillerData = await thrillerRes.json();
        const fantasyData = await fantasyRes.json();
        const bioData = await bioRes.json();
        const selfHelpData = await selfHelpRes.json();
        const childrenData = await childrenRes.json();

        setBestBooks(bestBooksData.items);
        setHarryPotter(harryPotterData.items);
        setRomance(romanceData.items);
        setThriller(thrillerData.items);
        setSelfHelp(selfHelpData.items);
        setBio(bioData.items);
        setFantasy(fantasyData.items);
        setFantasy(childrenData.items);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { loading, bestBooks, harryPotter,romance,thriller,fantasy,bio,selfHelp,children };
};

export default bookData;
