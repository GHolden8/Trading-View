import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandlestickChart from './stockGraph'

function StockExaminer() {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>Welcome to the StockExaminer Page!</h1>
      <CandlestickChart/>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default StockExaminer;
