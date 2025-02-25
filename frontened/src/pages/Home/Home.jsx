import { Link } from 'react-router-dom';
import './Home.css';
import rocket from '../../assets/rocket.webp';
import Review from '../../components/Review/Review.jsx';
import Article from '../../components/Article/Article.jsx';
import Card from '../../components/Card/Card.jsx';
import { useBookStore } from '../../store/useBookStore.js';
import { useEffect } from 'react';
import BrowseByAuthor from '../../components/BrowseByAuthor/BrowseByAuthor.jsx';
import Popular from '../../components/Popular/Popular.jsx';
import { useUserStore } from '../../store/useUserStore.js';

const Home = () => {
  const { fetchFeaturedBooks } = useBookStore();

  useEffect(() => {
    fetchFeaturedBooks();
  }, [fetchFeaturedBooks]);


  return (
    <>
      <div className="main">
        <div className="maintext">
          <h1>Best Place To Find Your <span>Favourite Book</span></h1>
          <p>Discover millions of book title with the best price offered here. Available for worldwide shipping and payment.</p>
        </div>
      </div>

      <div className="bookContainer">
        <h1>Browse by <span>Popular Authors</span></h1>
        <BrowseByAuthor />
      </div>

      <div className="arrivalContainer">
        <div className="arrivalhead">
          <h1>New Arrivals</h1>
        </div>
        <div className="Container">
          <Card />
        </div>
      </div>

     

      <div className="popular-collection">
        <Popular/>
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

      <Review />

      <div className="goodread">
        <h1>Good Reads</h1>
        <Article />
        <button className="view"><Link to="/blog">view all &rarr;</Link></button>
      </div>
    </>
  )
}

export default Home
