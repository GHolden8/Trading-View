// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

var tempData = "Test Data";
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
  //const googleRecent = ;
  var opts = {
    headers: {
      'mode':'no-cors'
    }
  }
    fetch('http://127.0.0.1:8080/GOOGL/daily', opts)
        .then(response => response.json())
        .then(data => {
            // Handle the JSON data here
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
        
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/portfolio')}>Go to Portfolio Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Page</button>
      <h1>The most recent Google share price is: {tempData}</h1>
    </div>
  );
}

export default HomePage;

