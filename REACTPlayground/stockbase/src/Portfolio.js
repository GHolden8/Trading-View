// Portfolio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Portfolio() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Portfolio Page!</h1>
      <button onClick={() => navigate('/')}>Go to Home Page</button>
    </div>
  );
}

export default Portfolio;

