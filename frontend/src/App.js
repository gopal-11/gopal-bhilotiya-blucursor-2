import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [index, setIndex] = useState(0);
  const [limit, setlimit] = useState(50);

  // Fetch data from the API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${limit}&index=${index}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:3000/items?index=${index}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      });
  };

  const getStars = (rating) => {
    let stars = [];
    let i;
    for (i = 1; i <= 5; i++) {
      let starClass = i <= rating ? 'star fa fa-star' : 'star-empty fa fa-star';
      stars.push(<span className={starClass} key={i}></span>);
    }

    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="App">
      <div className="header_main">
        <span> Product Images assign 2</span>
        <div className="home_icon">
          <span></span>
        </div>
      </div>
      <div style={{ marginTop: 95 }}>
        <div>
          <label style={{ margin: '10px' }}>
            Index:
            <input
              type="number"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
          </label>
          <label style={{ margin: '10px' }}>
            Count:
            <input
              type="number"
              value={limit}
              onChange={(e) => setlimit(e.target.value)}
            />
          </label>

          <button onClick={handleSearch} style={{ margin: '10px' }}>
            Search
          </button>
        </div>

        <div>
          {
            <>
              <div className="items">
                {filteredItems.map((item) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '10px',
                      width: '280px',
                      boxShadow: '0 3px 10px 0 black',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      paddingBottom: '10px',
                      margin: '10px',
                    }}
                    key={item.title}
                  >
                    <img
                      src={item.image}
                      style={{
                        objectFit: 'cover',
                        height: '300px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                      }}
                      alt={item.title}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '10px',
                      }}
                    >
                      <span>{item.title}</span>
                      <span>Price: {item.price}</span>
                      <span>Rating: {getStars(item.rating.rate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
