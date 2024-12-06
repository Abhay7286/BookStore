import React from 'react';
import "./Article.css"

const Article = () => {
  return (
    <>
      
      <div className="article">
          <div className="articleContainer">
            <div className="articlebox">
              <img src="https://kitabay.com/cdn/shop/articles/greek_gods.gif?height=600&v=1707726907&width=800" alt="greekgods" />
              <p>The Gods' Symposium: Celebrating the Timeless Wisdom of Vintage Classics</p>
            </div>
            <div className="articlebox">
              <img src="https://kitabay.com/cdn/shop/articles/0_tF25QMZEZ7x8jX0c.gif?height=270&v=1707726982&width=480" alt="greekgods" />
              <p>A Night of Literary Wanderings: Unveiling the Magic of Children’s Books</p>
            </div>
            <div className="articlebox">
              <img src="https://kitabay.com/cdn/shop/articles/giphy_15.gif?height=351&v=1707726840&width=351" alt="greekgods" />
              <p>Memoirs Unmasked: How Personal Stories Give Life a Plot Twist!</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default Article