import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css';

function StockFavoritesPage() {
  const navigate = useNavigate();
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const [nonFavoriteStocks, setNonFavoriteStocks] = useState([]);

  // Function to fetch favorite and non-favorite stocks
  const fetchStocks = () => {
    Promise.all([
      fetch('http://localhost:8080/favorites').then(res => res.json()),
      fetch('http://localhost:8080/nonfavorites').then(res => res.json())
    ]).then(([favoritesData, nonFavoritesData]) => {
      if (favoritesData && favoritesData.stocks) {
        setFavoriteStocks(favoritesData.stocks);
      }
      if (nonFavoritesData && nonFavoritesData.stocks) {
        setNonFavoriteStocks(nonFavoritesData.stocks);
      }
    }).catch(error => {
      console.error('Error fetching stocks:', error);
      // Handle errors, such as by setting error messages in state
    });
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const addToFavorites = (symbol) => {
    fetch(`http://localhost:8080/addfavorite/${symbol}`, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to set ${symbol} as favorite, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          // Re-fetch favorites and non-favorites to update the view
          fetchStocks();
        } else {
          throw new Error(`Failed to add ${symbol} to favorites`);
        }
      })
      .catch(error => {
        console.error(`Error adding ${symbol} to favorites:`, error);
        // Handle errors, such as by setting error messages in state
      });
  };

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
          // Re-fetch favorites and non-favorites to update the view
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
  
      <div className="scrollable-container">
        <h2>Others</h2>
        {nonFavoriteStocks.map(stock => (
          <div key={stock.id} className="stock-entry">
            <h3>{stock.id}</h3>
            <p>Last Price: {stock.latest}</p>
            <p>Percent Change: {stock.percent_change}%</p>
            <button onClick={() => addToFavorites(stock.id)}>+</button>
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








