// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/stockfavorites')}>Go to Favorite Stocks Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Examiner Page</button>
    </div>
  );
}

export default HomePage;

