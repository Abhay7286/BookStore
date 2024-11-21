import React from 'react'
import  bookload from "../../assets/bookload.gif"
import  loginimg from "../../assets/loginimg.jpg"
import  vision from "../../assets/vision.svg"
import  mission from "../../assets/mission.svg"
import  community from "../../assets/community.jpg"
import "./Store.css"

const Store = () => {
  return (
    <>
    <div className="aboutus-container">
      <div className="aboutus-text">
        At Bookstore, we’re passionate about connecting readers with the books they love. Our curated selection spans genres and styles, offering something for everyone—from bestsellers to hidden gems. Founded in [Year], we’re dedicated to making reading accessible and enjoyable for all. Explore our collection and discover your next great read with us.
      </div>
      <img src={loginimg} alt="img" className='aboutus-img'/>
    </div>

    <div className="xcontainer">
    <div className="xhead">
    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro velit illum inventore doloribus vitae rerum ab architecto itaque, vero culpa.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, totam.</p>
    </div>
    <div className="vision-container">
      <div className="visionbox">
        <img src={vision} alt="vision" />
        <h3>OUR VISION</h3>
        <p>"To be the leading online destination for readers of all ages, fostering a global community where the love for books thrives, and every story finds its reader."</p>
      </div>
      <div className="missionbox">
        <img src={mission} alt="mission" />
        <h3>OUR MISSION</h3>
        <p>"Our mission is to inspire a love for reading by offering a diverse selection of books, personalized service, and a welcoming space for all readers to discover and enjoy."</p>
      </div>
    </div>
    </div>

    <div className="community-container">
      <h1>Building Community That You Love!</h1>
      <img src={community} alt="community" className='community-img'/>
      <p>"At Bookstore,community is at the heart of everything we do. We strive to create a welcoming environment where readers can connect, share, and grow together. Our bookstore is more than just a place to buy books; it’s a hub for literary enthusiasts to gather, whether through in-person book clubs, virtual discussions, or author events. We encourage our readers to explore new ideas, engage in thoughtful conversations, and build lasting friendships through a shared love of books. By fostering these connections, we aim to nurture a vibrant, inclusive community that celebrates the joy of reading and the diverse voices that shape our world."</p>
    </div>
    
    <div className="booksworld-container">
      <img src={bookload} alt="gif" className='gif-img'/>
      <h1>"A room without books is like a body without a soul." 
          Happy Reading...
      </h1>
    </div>

    </>
  )
}

export default Store
