import {React,useState} from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import cart from '../../assets/cart.svg'
import person from '../../assets/person.svg'

const Navbar = () => {
  const [menu, setMenu] = useState("Home")
  return (
    
    <div className="navbar">
        <div className="nav-logo">
            <h2>BookStore</h2>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("Home")}}> <Link to="/">Home{menu=="Home"?<hr/>:''}</Link></li>
            <li onClick={()=>{setMenu("Categories")}}> <Link to="/categories">Categories{menu=="Categories"?<hr/>:''}</Link></li>
            <li onClick={()=>{setMenu("Store")}}> <Link to="/store">Store{menu=="Store"?<hr/>:''}</Link></li>
            <li onClick={()=>{setMenu("Contact")}}> <Link to="/contact">Contact{menu=="Contact"?<hr/>:''}</Link></li>
            <li onClick={()=>{setMenu("Blog")}}> <Link to="/blog">Blog{menu=="Blog"?<hr/>:''}</Link></li>
        </ul>
      
        <div className="nav-login-cart">
          <button><Link to='/login'><img src={person} alt="person" /> Login</Link></button>
          <button className="cart">
            <Link to='/cart'> 
            <img src={cart} alt="cart"/>
            <div className="nav-cart-count">$56.00</div>
            </Link>
          </button>
            
            
        </div>
    </div>
  )
}

export default Navbar
