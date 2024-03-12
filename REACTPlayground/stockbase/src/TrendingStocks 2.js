
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

/*
JSON DATA ORDER:
0 - Date/time
1 - interval
2 - open
3 - high
4 - low
5 - close
*/

/* 
STOCK ORDER:
0 - NVDA
1 - GOOGL
2 - META
3 - LLY
4 - TSLA
5 - AVGO
6 - V
7 - JPM
8 - UNH
9 - MA
10 - HD
11 - AMZN
12 - XOM
13 - AAPL (NOT USED)
14 - MSFT (NOT USED)
15 - BRK.B (NOT USED)
*/

const TrendingData = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const stocks = [];
            const response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            //store the json in result after checking is done
            const result = await response.json();
            const dataArray = result.data;
            const todaysData = dataArray[dataArray.length - 1];
            const yesterdaysData = dataArray[dataArray.length - 2];

            console.log("TODAY'S DATA: ", todaysData);
            console.log("YESTERDAY'S DATA: ", yesterdaysData);
            

            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []); 

  return (
    <div className='container mt-5'>

    </div>
  );
};

export default TrendingData;
