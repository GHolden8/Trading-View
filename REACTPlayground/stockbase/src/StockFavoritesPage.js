import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css';

function StockFavoritesPage() {
  const navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8080/favorites') // Update with the correct server URL if needed
      .then(response => {
        if (!response.ok) {
          console.error('Server response status:', response.status);
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.text(); // We use text() to get raw response
      })
      .then(rawData => {
        console.log('Raw data:', rawData); // Log the raw data to see what it looks like
        if (rawData === 'null') {
          throw new Error('Received null from server');
        }
        // Set the raw data into the serverResponse state
        setServerResponse(rawData || 'No data received');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setServerResponse(`Error: ${error.message}`);
      });
  }, []);
  

  return (
    <div className="stock-favorites-body">
      <h1 className="stock-favorites-heading">Welcome to your Stock Favorites Page!</h1>
      {/* Render the raw server response or error message */}
      <pre>{serverResponse}</pre>
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





