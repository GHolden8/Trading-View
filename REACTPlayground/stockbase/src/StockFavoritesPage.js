// StockListingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stockFavoritesStyle.css'; // Make sure the path is correct

function StockFavoritesPage() {
  const navigate = useNavigate();

  return (
    <div className="stock-favorites-body">
      <h1 className="stock-favorites-heading">Welcome to the Stock Listing Page!</h1>
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


