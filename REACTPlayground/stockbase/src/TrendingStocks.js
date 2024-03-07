
import React, { useEffect } from 'react';

/*
JSON DATA ORDER:
0 - Date/time
1 - interval
2 - open
3 - high
4 - low
5 - close
*/

const TrendingData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //store the json in result after checking is done
        const result = await response.json();
        const dataArray = result.data;
        const entryOne = dataArray[0];
        console.log("RETRIEVED DATA:", result);
        console.log("DATA: ", dataArray[0]);
        console.log("FIRST DATE: ", entryOne[0]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div id="chart" />
  );
};

export default TrendingData;
