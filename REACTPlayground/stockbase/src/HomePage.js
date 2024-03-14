// HomePage.js
import React from 'react';
import TrendingData from './TrendingStocks';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='home-page-body'>
      <h1>Welcome to Stockbase!</h1>
      <button className='favorites' onClick={() => navigate('/stockfavorites')}>Go to Stock Favorites Page</button>
      <TrendingData/>
    </div>
  );
}

export default HomePage;