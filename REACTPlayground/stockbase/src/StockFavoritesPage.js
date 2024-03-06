// StockFavoritesPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css';

function StockFavoritesPage() {
  const navigate = useNavigate();
  const [googlData, setGooglData] = useState({ latest: 'Loading...', percent_change: 'Loading...' });

  useEffect(() => {
    // Fetch the favorite stocks from the server when the component mounts
    fetch('http://127.0.0.1:8080/favorites')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Find the GOOGL ticker in the response
        const googlTicker = data.stocks.find(ticker => ticker.id === 'GOOGL');
        // Update the state with the GOOGL data
        setGooglData(googlTicker || { latest: 'Not found', percent_change: 'N/A' });
      })
      .catch(error => {
        console.error('Error fetching GOOGL data:', error);
        // Update the state to show the error
        setGooglData({ latest: 'Error', percent_change: 'Error' });
      });
  }, []);

  return (
    <div className="stock-favorites-body">
      <h1 className="stock-favorites-heading">Welcome to your Stock Favorites Page!</h1>
      <h2>GOOGL</h2>
      <p>Last Price: {googlData.latest}</p>
      <p>Percent Change: {googlData.percent_change}%</p>
      <div className="stock-favorites-button-container">
        <button
          className="stock-favorites-button"
          onClick={() => navigate('/')}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default StockFavoritesPage;




