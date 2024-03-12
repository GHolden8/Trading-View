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
      <h1 className="stock-favorites-heading">Welcome to your Stock Favorites Page!</h1>
  
      <div className="scrollable-container">
        <h2>Favorites</h2>
        {favoriteStocks.map(stock => (
          <div key={stock.id} className="stock-entry">
            <h3>{stock.id}</h3>
            <p>Last Price: {stock.latest}</p>
            <p>Percent Change: {stock.percent_change}%</p>
            <button onClick={() => removeFromFavorites(stock.id)}>−</button>
          </div>
        ))}
      </div>
  
      <div className="stock-favorites-button-container">
        <button className="stock-favorites-button" onClick={() => navigate('/')}>
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default StockFavoritesPage;









