import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandlestickChart from './stockGraph';

function StockExaminer() {
  const navigate = useNavigate();
  const { symbol } = useParams(); // Get the stock symbol from the URL parameter
  const [stockInfo, setStockInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to fetch stock details and determine if it's a favorite
  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        // Fetch the stock's details (adjust URL as necessary)
        const response = await fetch(`http://localhost:8080/${symbol}/daily`);
        const data = await response.json();
        setStockInfo(data);

        // Check if the stock is a favorite (adjust URL as necessary)
        const favoritesResponse = await fetch('http://localhost:8080/favorites');
        const favoritesData = await favoritesResponse.json();
        setIsFavorite(favoritesData.stocks.some(s => s.id === symbol));
      } catch (error) {
        console.error('Error fetching stock info:', error);
      }
    };

    fetchStockInfo();
  }, [symbol]);

  const toggleFavorite = () => {
    const endpoint = isFavorite ? '/delfavorite/' : '/addfavorite/';
    fetch(`http://localhost:8080${endpoint}${symbol}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsFavorite(!isFavorite);
          // Optional: refresh the page or perform some other action
        }
      })
      .catch(error => {
        console.error('Error toggling favorite status:', error);
      });
  };

  return (
    <div>
      <h1>Welcome to Stock View page! Currently Viewing: </h1>
      {stockInfo && <CandlestickChart symbol='GOOGL' startDate = '2023-01-01' endDate = '2023-03-01'/>} {/* Pass stockInfo as props to CandlestickChart */}
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default StockExaminer;
