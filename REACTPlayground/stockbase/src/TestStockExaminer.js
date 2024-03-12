import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TestStockExaminer() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stockInfo, setStockInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetches the stock's details and checks if it is a favorite
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const infoResponse = await fetch(`http://localhost:8080/${symbol}/daily`);
        const infoData = await infoResponse.json();
        setStockInfo(infoData);

        const favoritesResponse = await fetch('http://localhost:8080/favorites');
        const favoritesData = await favoritesResponse.json();
        setIsFavorite(favoritesData.stocks.some(s => s.id === symbol));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDetails();
  }, [symbol]);

  // Handles adding or removing the stock from favorites
  const toggleFavorite = async () => {
    const endpoint = isFavorite ? 'delfavorite' : 'addfavorite';
    try {
      const response = await fetch(`http://localhost:8080/${endpoint}/${symbol}`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setIsFavorite(!isFavorite);
        // Navigate back to the StockFavoritesPage if added to favorites
        if (!isFavorite) {
          navigate('/stockfavorites');
        }
      } else {
        throw new Error(data.message || 'Failed to toggle favorite');
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
          <h2>{symbol}</h2>
          {/* Display stock details here. Adjust according to your data structure */}
          <p>Last Price: {stockInfo.last}</p>
          <p>Change: {stockInfo.change}</p>
          <button onClick={toggleFavorite}>
            {isFavorite ? '− Remove from Favorites' : '+ Add to Favorites'}
          </button>
        </>
      )}
    </div>
  );
}

export default TestStockExaminer;
