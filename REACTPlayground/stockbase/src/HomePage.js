// HomePage.js
import React from 'react';
import TrendingData from './TrendingStocks';
import { useNavigate } from 'react-router-dom';

//var tempData = "";

/*
JSON DATA ORDER:
0 - Date/time
1 - interval
2 - open
3 - high
4 - low
5 - close

*/

function HomePage() {
  const navigate = useNavigate();
  var testData = "ligma";

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/stockfavorites')}>Go to Stock Favorites Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Page</button>
      <button onClick={() => navigate('/teststockexaminer')}>Go to Stock Examiner Page</button>
      <h1>The most recent Google share price is: {testData}</h1>
      <TrendingData/>
    </div>
  );
}

export default HomePage;