import React from 'react'
import { useBookStore } from '../../store/useBookStore.js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';

const Genre = () => {
    const {fetchBooksByGenre, books} = useBookStore();

    const { genre } = useParams();

    useEffect(() => {
      fetchBooksByGenre(genre);
    }, [fetchBooksByGenre, genre]);
    
    console.log(books);
   
  return (
    <div>
        <motion.h1
        className="dashboard-heading" 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
            {genre}
        </motion.h1>
    </div>
  )
}

export default Genre
