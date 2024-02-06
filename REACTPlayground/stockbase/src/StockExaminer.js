// StockExaminer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StockExaminer() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the StockExaminer Page!</h1>
      <button onClick={() => navigate('/')}>Go to Stock Examiner Page</button>
    </div>
  );
}

export default StockExaminer;

