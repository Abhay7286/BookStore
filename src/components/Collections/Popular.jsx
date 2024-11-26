import React from 'react'

const Popular = () => {
    const genreData = {
        Romance: romance,
        Mystery: romance, 
        Thriller: romance, 
        Fantasy: romance, 
        Historical: romance, 
      };
  return (
    <>
      <div className="popular-collection">
        <div className="popular-head">
          <h1>Popular Collection</h1>
          <div className="links">
            {["Romance", "Mystery", "Thriller", "Fantasy", "Historical"].map(
              (genre) => (
                <li
                  key={genre}
                  onClick={() => setGen(genre)}
                  className={gen === genre ? "active-tab" : ""}
                >
                  {genre}
                </li>
              )
            )}
            <li>
              <Link to="/collections">View all &rarr;</Link>
            </li>
          </div>
        </div>

        <div className="popular-section">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : currentBooks && currentBooks.length > 0 ? (
            <div className="books-grid">
              {currentBooks.map((book) => (
                <div className="book-card" key={book.id}>
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "placeholder-image-url"
                    }
                    alt={book.volumeInfo.title}
                  />
                  <div className="book-info">
                    <h3>{book.volumeInfo.title}</h3>
                    <p className="price">$99.99</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-books">No books available for this genre.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Popular
