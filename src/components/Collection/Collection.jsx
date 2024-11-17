import React from 'react';
import "./Collection.css";
import { Link } from "react-router-dom";
import bookload from "../../assets/bookload.gif"


const Collection = () => {
  return (
    <>
    <main>
      <img src={bookload} alt="gif" />
      <h1>The Best Books We Read This Week</h1>

    </main>
    </>
  )
}

export default Collection
