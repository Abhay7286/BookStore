import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon1.png";
import "./BrowseByGenre.css";

const genres = [
  "fiction",
  "self-help",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "Poetry", 
  "Biography",
];
const BrowseByGenre = () => {

  return (
    <div className="typeContainer">
      {genres.map((genre) => (
        <div className="type" key={genre}>
          
          <Link to={`/genre/${genre}`}>
            <img src={icon} alt="img" />
            <div className="icon-name">{genre}</div>
            <div className="items">355 Items</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrowseByGenre;
