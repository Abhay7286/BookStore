import React from 'react'
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="search" placeholder='Search here' />
            <button type="submit" className="searchbtn">search</button>
        </div>
    )
}

export default SearchBar
