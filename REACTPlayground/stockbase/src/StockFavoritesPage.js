import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css'; //import css

function StockFavoritesPage() {
  const navigate = useNavigate();
  //setup the navigate constant, allows use of the React router
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  //setup of the use state variable favoriteStocks, to be updated by the setFavoriteStocks function

  const sortedStocks = favoriteStocks.sort((a, b) => a.id.localeCompare(b.id));
  //sort the stocks in alphabetical order by their id property

  // Function to fetch favorite stocks
  const fetchStocks = () => {
    fetch('http://localhost:8080/favorites').then(res => res.json()) //fetch; HTTP GET request to the server. returns promise as a json object
    .then(favoritesData => {
      if (favoritesData && favoritesData.stocks) {
        setFavoriteStocks(favoritesData.stocks);
      }
    }).catch(error => {
      console.error('Error fetching stocks:', error);
      // Handle errors, such as by setting error messages in state
    });
  };//end of func

  useEffect(() => {
    fetchStocks();
  }, []); //little confused on this part... what it does

  const removeFromFavorites = (symbol) => {
    fetch(`http://localhost:8080/delfavorite/${symbol}`, { method: 'POST' }) //Send POST fetch request to server to remove stock from favorites
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to remove ${symbol} from favorites, status: ${response.status}`);
        }//error handler for failing to remove stock
        return response.json(); // Accept the JSON response if it is sent back
      })
      .then(data => {
        if (data.success) {
          // Once complete, then refresh the stocks
          fetchStocks();
        } else {
          throw new Error(`Failed to remove ${symbol} from favorites`);
        }//else just handle the error
      })
      .catch(error => {
        console.error(`Error removing ${symbol} from favorites:`, error);
        // Handle errors, such as by setting error messages in state
      });
  };//end of remove from favorites function

  return (
    <div className="stock-favorites-body">
      <div className="stock-favorites-top-button-container">
        <button className="stock-favorites-button" onClick={() => navigate('/')}>
          Go to Home Page
        </button>
      </div>
  
      <h1 className="stock-favorites-heading">Favorite Stocks</h1>
      
      <div className="scrollable-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {sortedStocks.map((stock, index) => (
          <div key={stock.id} className="stock-entry" style={{ margin: '10px', width: 'calc(33.33% - 20px)', boxSizing: 'border-box', border: '1px solid black', padding: '10px', textAlign: 'center' }}>
            <h3>{stock.id}</h3>
            <p className="stock-price">Last Price: {stock.latest} USD</p>
            <p className={`stock-change ${stock.percent_change < 0 ? 'negative' : 'positive'}`}>
              Percent Change: {stock.percent_change}%
            </p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => removeFromFavorites(stock.id)} className="stock-toggle-favorite" style={{ width: '100%' }}>
                Remove From Favorites
              </button>
              <button onClick={() => navigate(`/stockexaminer/${stock.id}`)} className="another-action-button" style={{ width: '100%', marginTop: '10px' }}>
                View Stock
              </button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
   
}//end of stock favorites page func

export default StockFavoritesPage;










