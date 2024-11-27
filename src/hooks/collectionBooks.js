import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const bookData = () => {
  const [loading, setLoading] = useState(false);
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
      const API_KEY = "AIzaSyBGr0yc3hwMzyKN8hLO5bFUnMrSx8JlSyw"; 
      try {

        const [harryPotterRes, romanceRes, thrillerRes, fantasyRes, bioRes, selfHelpRes, childrenRes] = await Promise.all([
          fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=romance&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=thriller&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=fantasy&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=biography&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=self-help&key=${API_KEY}`),
          fetch(`https://www.googleapis.com/books/v1/volumes?q=children&key=${API_KEY}`),
        ]);
        
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
        setChildren(childrenData.items);
        
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { loading,harryPotter,romance,thriller,fantasy,bio,selfHelp,children };
};

export default bookData;
