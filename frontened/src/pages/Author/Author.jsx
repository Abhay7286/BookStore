import React from 'react'
import { useBookStore } from '../../store/useBookStore.js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Author.css';
import AuthorsCard from '../../components/AuthorsCard/AuthorsCard.jsx';

const Author = () => {
  const { fetchBooksByAuthor } = useBookStore();
  const {books} = useBookStore()

  const { author } = useParams();
  const auth = author.toLowerCase();

  useEffect(() => {
    fetchBooksByAuthor(auth);
  }, [fetchBooksByAuthor, author]);

  console.log(auth)


  return (
    < >
      <motion.h1
        className="dashboard-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {author}
      </motion.h1>

      <div className="card-container">
        <AuthorsCard books={books}  />
      </div>
    </ >
  )
}

export default Author
