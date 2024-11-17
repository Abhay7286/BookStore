import {React,useState} from "react";
import Card from "./Card";
import "./Home.css";
import icon from "../../assets/icon1.png"
import { Link } from "react-router-dom";
import homebackground from "../../assets/img.png";
import ikagai from '../../assets/ikagai.jpg';
import loginimg from '../../assets/loginimg.jpg';
import rocket from '../../assets/rocket.webp';
import Reviews from "./Reviews";
import Article from "./Article";

const Home = () => {
  const [gen, setGen] = useState("Romance");
  return (
    <>
      <div className="main">
        <img src={homebackground} alt="background" />
      <div className="maintext">
        <h1>Best Place To Find Your <span>Favourite Book</span></h1>
        <p>Discover millions of book title with the best price offered here.Available for worldwide shipping and payment.</p>
        <div className="search-bar">
          <input type="search" placeholder='Search here'/>
          <button type="submit" className="searchbtn">search</button>
        </div> 
      </div>
      </div>

      <div className="bookContainer">
        <h1>Browse by <span>Book Types</span></h1>
        <div className="typeContainer">
        <div className="type">
          <img src={icon} alt="img" />
          <div className="icon-name">Non Fiction</div>
          <div className="items">355 Items</div>
        </div>
        <div className="type">
          <img src={icon} alt="img" />
          <div className="icon-name">Non Fiction</div>
          <div className="items">355 Items</div>
        </div>
        <div className="type">
          <img src={icon} alt="img" />
          <div className="icon-name">Non Fiction</div>
          <div className="items">355 Items</div>
        </div>
        <div className="type">
          <img src={icon} alt="img" />
          <div className="icon-name">Non Fiction</div>
          <div className="items">355 Items</div>
        </div>
        <div className="type">
          <img src={icon} alt="img" />
          <div className="icon-name">Non Fiction</div>
          <div className="items">355 Items</div>
        </div>
        </div>
      </div>
    
      <div className="arrivalContainer">
        <div className="arrivalhead">
        <h1>New Arrivals</h1>
         <div>"Discover the Latest Must-Reads!"</div>
         <p>
            Step into a world of new stories with our latest arrivals. From gripping thrillers to heartwarming romances, our shelves are brimming with fresh adventures waiting to be explored. Whether you're in the mood for a captivating mystery, an inspiring non-fiction read, or an epic fantasy, you'll find something that speaks to you. Dive in today and uncover your next favorite book!
        </p>
        </div>
        <div className="Container">
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
      </div>

      <div className="store">
          <img src={loginimg} alt="img" className="store-img" />
          <div className="about">
            <h1>BookStore</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.   Laudantium harum neque iste hic aliquam minima itaque perferendis   quidem, tempora minus assumenda quas expedita. Esse quia et vel   obcaecati commodi suscipit!</p>
          </div>
      </div>

      <div className="popular-collection">
        <div className="popular-head">
          <h1>Popular Collection</h1>
          <div className="links">
                <li onClick={()=>{setGen("Romance")}}><Link>Romance {gen=="Romance"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Mystery")}}><Link>Mystery {gen=="Mystery"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Thriller")}}><Link>Thriller {gen=="Thriller"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Sci-fi")}}><Link>Sci-fi{gen=="Sci-fi"?  <hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Historical")}}><Link>Historical{gen=="Historical"?  <hr/>:''}</Link></li>
                <li><Link>View all &rarr; </Link></li>
                
          </div>
        </div>

        <div className="popular-section">
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
          <div className="book"> 
            <img src={ikagai} alt="ikagai" />
            <div className="description">
              <div className="price">$99.99</div>
              <div className="name">ikagai</div>
            </div>
          </div>
        </div>
      </div>

      <div className="discoverContainer">
        <div className="discover-img">
          <img src={rocket} alt="rocket" />
          <div className="readerCard">
            10k Happy <span className="reader">Reader</span>
          </div>
        </div>
        <div className="discoverContent">
          <h1>The Best Place to Discover and Engage with book </h1>
          <p>Starting off in eighteenth century London, this book invites readers to an exciting journey.The lifelong fight of main protagonists crime solving. The life of his fights against the biggest villians.</p>
          <div className="boxes">
            <div className="box">Productivity</div>
            <div className="box">Solution</div>
            <div className="box">option</div>
          </div>
        </div>
      </div>

      <Reviews/>

      <div className="goodread">
      <h1>Good Reads</h1>
      <Article/>
      <button className="view"><Link to="/blog">view all &rarr;</Link></button>
      </div>
    </>
  );
};

export default Home;
