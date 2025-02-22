import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CandlestickChart from './stockGraph'; // Assuming this is correctly set up to display based on `stockInfo`
import './stockExaminer.css';

function StockExaminer() {
  const navigate = useNavigate();
  const { symbol } = useParams(); // Extracts the symbol from URL params *THIS IS WHERE JAKE WILL NEED TO HAVE THE SYMBOL CHANGE WHEN THE STOCK IS CLICKED, PART OF THE URL PATH *
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
      }//Error handler
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
          navigate('/stockfavorites'); //once clicked, naviagte to the favorites page
        }
      } else {
        throw new Error(data.message || 'Failed to toggle favorite status');
      }//erro handler
    } catch (error) {
      console.error('Error:', error);
    }//error handler
  };
// Define a function to format the current date
function getCurrentDayFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

  return (
    <div className = "stock-examiner-body">
      <h1>Currently Viewing {`${symbol}`} </h1>
      {stockInfo && (
        <>
          {stockInfo && <CandlestickChart className= "candle" symbol={`${symbol}`} startDate = '2022-01-01' endDate={`${getCurrentDayFormatted()}`}/>} {/* Pass stockInfo as props to CandlestickChart */}

          <button className = "stock-examiner-button" onClick={toggleFavorite}>
            {isFavorite ? '− Remove from Favorites' : '+ Add to Favorites'}
          </button>{/* Button to handle the adding or removal of a stock to favorites */}

        </>
      )}
      <button className = "stock-examiner-button" onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default StockExaminer;

