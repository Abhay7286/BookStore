import { Link } from 'react-router-dom';
import './Home.css';
import loginimg from '../../assets/loginimg.jpg';
import rocket from '../../assets/rocket.webp';
import Review from '../../components/Review/Review.jsx';
import Article from '../../components/Article/Article.jsx';
import Card from '../../components/Card/Card.jsx';
import { useBookStore } from '../../store/useBookStore.js';
import { useEffect } from 'react';
import BrowseByGenre from '../../components/BrowseByGenres/BrowseByGenre.jsx';
import Popular from '../../components/Popular/Popular.jsx';

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
        <h1>Browse by <span>Popular Genres</span></h1>
        <BrowseByGenre />
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
