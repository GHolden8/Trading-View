// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

/*
JSON DATA ORDER:
0 - Date/time
1 - interval
2 - open
3 - high
4 - low
5 - close

*/


async function getStockHistory() {
  try {
    let response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
    let responseJson = await response.json();
    return responseJson;
   } catch(error) {
    console.error(error);
  }
}


function HomePage() {
  const navigate = useNavigate();
  const googleData = getStockHistory();
  //const googleRecent = ;
  
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/portfolio')}>Go to Portfolio Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Page</button>
      <h1>The most recent Google share price is: {googleData.data}</h1>
    </div>
  );
}

export default HomePage;

