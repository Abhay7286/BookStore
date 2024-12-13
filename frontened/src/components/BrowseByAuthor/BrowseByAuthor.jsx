import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/icon1.png";
import "./BrowseByAuthor.css";

const authors = [
  "Sarah Adams",
  "RuNyx",
  "Marcus Aurelius",
  "Joseph Murphy",
  "J.K. Rowling",
  "Fyodor Dostoyevsky",
  "Shakespeare",
  "Renuka Gavrani",
  "Morgan Housel",
  "Hector Garcia",
  "Francesc Miralles",
  "Jane Austen",
  "Charles Dickens",
  "Emily Bronte",
  "Percy Bysshe Shelley",
];
const BrowseByAuthor = () => {

  return (
    <div className="typeContainer">
      {authors.map((author) => (
        <div className="type" key={author}>
          
          <Link to={`/author/${author}`}>
            <img src={icon} alt="img" />
            <div className="icon-name">{author}</div>
            <div className="items">355 Items</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrowseByAuthor;
