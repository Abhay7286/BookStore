import {React,useState} from "react";
import { Link } from "react-router-dom";

const Popular = () => {
  return (
    <>
      <div className="popular-collection">
      <div className="popular-head">
          <h1>Popular Collection</h1>
          <div className="links">
                <li onClick={()=>{setGen("Romance")}}><Link>Romance {gen=="Romance"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Mystery")}}><Link>Mystery {gen=="Mystery"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Thriller")}}><Link>Thriller {gen=="Thriller"?<hr/>:''}</Link></li>
                <li onClick={()=>{setGen("fantasy")}}><Link>fantasy{gen=="fantasy"?  <hr/>:''}</Link></li>
                <li onClick={()=>{setGen("Historical")}}><Link>Historical{gen=="Historical"?  <hr/>:''}</Link></li>
                <li><Link to="/categories">View all &rarr; </Link></li>
                
          </div>
        </div>

        <div className="popular-section">
          {gen === "Romance" && <Romance />}
          {gen === "Mystery" && <Mystery />}
          {gen === "Thriller" && <Thriller />}
          {gen === "fantasy" && <Fantasy />}
          {gen === "Historical" && <Historical />}
        </div>
      </div>
    </>
  )
}

export default Popular