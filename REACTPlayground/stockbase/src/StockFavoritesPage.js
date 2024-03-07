import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css';

function StockFavoritesPage() {
  const navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState('Loading...');

  useEffect(() => {
    // Function to add GOOGL as a favorite
    const addGOOGLAsFavorite = () => {
      fetch('http://localhost:8080/addfavorite/GOOGL', { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to set GOOGL as favorite, status: ${response.status}`);
          }
          return response.json(); // Assuming the response will be in JSON
        })
        .then(data => {
          if (data.success) {
            console.log(data.message); // Confirming in the console that GOOGL was added
            // After adding to favorites, fetch the list of favorites
            fetchFavorites();
          } else {
            throw new Error('Failed to add GOOGL to favorites');
          }
        })
        .catch(error => {
          console.error('Error adding GOOGL to favorites:', error);
          setServerResponse(`Error: ${error.message}`);
        });
    };

    // Function to fetch favorites
    const fetchFavorites = () => {
      fetch('http://localhost:8080/favorites')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch favorites, status: ${response.status}`);
          }
          return response.text();
        })
        .then(rawData => {
          if (rawData === 'null') {
            throw new Error('Received null from server');
          }
          setServerResponse(rawData || 'No favorites data received');
        })
        .catch(error => {
          console.error('Error fetching favorites data:', error);
          setServerResponse(`Error: ${error.message}`);
        });
    };

    // Initially add GOOGL as a favorite
    addGOOGLAsFavorite();
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






