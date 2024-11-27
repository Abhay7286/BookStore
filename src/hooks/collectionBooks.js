import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setLoading] = useState(false);
  const [romance, setRomance] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [bio, setBio] = useState([]);
  const [history, setHistory] = useState([]);
  const [mystery, setMystery] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {

        const [ romanceRes, thrillerRes, fantasyRes, bioRes, historyRes, mysteryRes] = await Promise.all([
          fetch(`https://www.googleapis.com/books/v1/volumes?q=romance&maxResults=12`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=thriller&maxResults=12`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=fantasy&maxResults=12`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=biography&maxResults=12`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=history&maxResults=12`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=mystery&maxResults=12`),
        ]);
        

        const romanceData = await romanceRes.json();
        const thrillerData = await thrillerRes.json();
        const fantasyData = await fantasyRes.json();
        const bioData = await bioRes.json();
        const historyData = await historyRes.json();
        const mysteryData = await mysteryRes.json();

        setRomance(romanceData.items);
        setThriller(thrillerData.items);
        setFantasy(fantasyData.items);
        setBio(bioData.items);
        setHistory(historyData.items);
        setMystery(mysteryData.items);
        
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { loading,romance,thriller,fantasy,bio,history,mystery };
};

export default bookData;
