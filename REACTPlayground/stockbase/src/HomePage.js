// HomePage.js
import React from 'react';
import TrendingData from './TrendingStocks';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  var tempData = "ligma";
        
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/stockfavorites')}>Go to Stock Favorites Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Page</button>
      <h1>The most recent Google share price is: {tempData}</h1>
      <TrendingData/>
    </div>
  );
}

export default HomePage;