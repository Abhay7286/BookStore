import React, { useState } from 'react';
import Article from '../Home/Article.jsx';
import news from '../../assets/news.png';
import './Blog.css';

const Blog = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const toggleForm = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubscribed(!isSubscribed);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <main>
        <div className="sub-container">
          <img src={news} alt="news" />
          <div className="subscribe">
            <h1>"The Reading Room: Your Literary Hub"</h1>
            {!isSubscribed && (
              <form onSubmit={toggleForm} className='blog-form'>
                <input className='input'
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
            {isSubscribed && <h2>Thanks for subscribing!</h2>}
          </div>
        </div>
        {[...Array(8)].map((_, index) => (
          <Article key={index} />
        ))}
      </main>
    </>
  );
};

export default Blog;

