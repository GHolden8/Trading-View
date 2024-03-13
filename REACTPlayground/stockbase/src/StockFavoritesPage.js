import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css';

function StockFavoritesPage() {
  const navigate = useNavigate();
  const [favoriteStocks, setFavoriteStocks] = useState([]);

  // Function to fetch favorite stocks
  const fetchStocks = () => {
    fetch('http://localhost:8080/favorites').then(res => res.json())
    .then(favoritesData => {
      if (favoritesData && favoritesData.stocks) {
        setFavoriteStocks(favoritesData.stocks);
      }
    }).catch(error => {
      console.error('Error fetching stocks:', error);
      // Handle errors, such as by setting error messages in state
    });
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const removeFromFavorites = (symbol) => {
    fetch(`http://localhost:8080/delfavorite/${symbol}`, { method: 'POST' }) // Ensure the method type matches what the server expects
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to remove ${symbol} from favorites, status: ${response.status}`);
        }
        return response.json(); // Assuming the server returns a JSON response
      })
      .then(data => {
        if (data.success) {
          // Re-fetch favorites to update the view
          fetchStocks();
        } else {
          throw new Error(`Failed to remove ${symbol} from favorites`);
        }
      })
      .catch(error => {
        console.error(`Error removing ${symbol} from favorites:`, error);
        // Handle errors, such as by setting error messages in state
      });
  };

  return (
    <div className="stock-favorites-body">
      <div className="stock-favorites-top-button-container">
        <button className="stock-favorites-button" onClick={() => navigate('/')}>
          Go to Home Page
        </button>
      </div>
  
      <h1 className="stock-favorites-heading">Favorite Stocks</h1>
      
      <div className="scrollable-container" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
        {favoriteStocks.map(stock => (
          <div key={stock.id} className="stock-entry" style={{ display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box', border: '1px solid black', padding: '10px' }}>
            <div style={{ flexGrow: 1 }}>
              <h3>{stock.id}</h3>
              <p className="stock-price">Last Price: {stock.latest} USD</p>
              <p className={`stock-change ${stock.percent_change < 0 ? 'negative' : 'positive'}`}>
                Percent Change: {stock.percent_change}%
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button onClick={() => navigate(`/stockexaminer/${stock.id}`)} className="stock-toggle-favorite" style={{ marginLeft: 'auto', width: '100%' }}>
                View Stock
              </button>
              <button onClick={() => removeFromFavorites(stock.id)} className="stock-toggle-favorite" style={{ marginLeft: 'auto', width: '100%' }}>
                Remove From Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
   
}

export default StockFavoritesPage;









