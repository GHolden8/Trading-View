import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandlestickChart from './stockGraph'; // Assuming this is correctly set up to display based on `stockInfo`

function StockExaminer() {
  const navigate = useNavigate();
  const { symbol } = useParams(); // Extracts the symbol from URL params
  const [stockInfo, setStockInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Combines fetching stock details and checking favorites status
    const fetchDetailsAndFavorites = async () => {
      try {
        // Fetching stock details
        const infoResponse = await fetch(`http://localhost:8080/${symbol}/daily`);
        const infoData = await infoResponse.json();
        setStockInfo(infoData);

        // Checking if the stock is a favorite
        const favoritesResponse = await fetch('http://localhost:8080/favorites');
        const favoritesData = await favoritesResponse.json();
        setIsFavorite(favoritesData.stocks.some(s => s.id === symbol));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDetailsAndFavorites();
  }, [symbol]);

  const toggleFavorite = async () => {
    // Identical logic to add or remove from favorites
    const endpoint = isFavorite ? 'delfavorite' : 'addfavorite';
    try {
      const response = await fetch(`http://localhost:8080/${endpoint}/${symbol}`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setIsFavorite(!isFavorite);
        // Optional: Re-fetch data or take other actions on success
        if (!isFavorite) {
          navigate('/stockfavorites'); // Adjust the navigation path as necessary
        }
      } else {
        throw new Error(data.message || 'Failed to toggle favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Stock Examiner</h1>
      {stockInfo && (
        <>
          {stockInfo && <CandlestickChart symbol='GOOGL' startDate = '2023-01-01' endDate = '2023-03-01'/>} {/* Pass stockInfo as props to CandlestickChart */}
          <button onClick={toggleFavorite}>
            {isFavorite ? '− Remove from Favorites' : '+ Add to Favorites'}
          </button>
        </>
      )}
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default StockExaminer;

