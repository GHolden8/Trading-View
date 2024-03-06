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

function HomePage() {
  const navigate = useNavigate();
  //const googleRecent = ;
    /*
    fetch('http://127.0.0.1:8080/GOOGL/daily', {
      'mode':'no-cors'
    })
        .then(response => response.text())
        .then(response => {
            // Handle the JSON data here
            console.log("SUCCESS");
            console.log(response);
          })
        .catch(error => {
            console.error('Error fetching JSON:', error );
        });
        */
        fetch('http://127.0.0.1:8080/GOOGL/daily', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
        ).then(response => {
          if (response.ok) {
            response.json().then(retArray => {
              console.log(retArray);
              return retArray;
            });
          }
        });
        
        
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={() => navigate('/stockfavorites')}>Go to Stock Favorites Page</button>
      <button onClick={() => navigate('/stockexaminer')}>Go to Stock Page</button>
      <h1>The most recent Google share price is: {tempData}</h1>
    </div>
  );
}

export default HomePage;

