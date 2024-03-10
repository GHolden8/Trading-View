import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandlestickChart from './stockGraph'

function StockExaminer() {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <p>
      <h1>Welcome to Stock View! Currently Viewing: </h1>
        <CandlestickChart symbol = "GOOGL" startDate="2023-01-01" endDate="2023-02-01" />
      <button onClick={() => navigate('/')}>Home</button>
    </p>
  );
}

export default StockExaminer;
