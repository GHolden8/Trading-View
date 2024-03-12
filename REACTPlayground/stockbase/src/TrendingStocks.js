
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
        let biggestGains  = [];  //STORE INDEXES OF BIGGEST GAINS
        let biggestLosses = [];  //STORE INDEXES OF BIGGEST LOSSES
        let stockDiffs    = [];  //STORE STOCK CHANGES ()
        let stockPrices   = [];  //STORE CURRENT STOCK PRICES (today's close)
        let stocks        = [];  //STORE ALL STOCK VALUES

        const fetchData = async () => {
            try {
                //NVDA
                var response = await fetch('http://127.0.0.1:8080/NVDA/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch NVDA data');
                }
                var result = await response.json();
                var dataArray = result.data;
                stocks[0] = dataArray[dataArray.length - 1];

                //GOOGL
                response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch GOOGL data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[1] = dataArray[dataArray.length - 1];
            
                //META
                response = await fetch('http://127.0.0.1:8080/META/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch META data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[2] = dataArray[dataArray.length - 1];

                //LLY
                response = await fetch('http://127.0.0.1:8080/LLY/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch LLY data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[3] = dataArray[dataArray.length - 1];

                //TSLA
                response = await fetch('http://127.0.0.1:8080/TSLA/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch TSLA data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[4] = dataArray[dataArray.length - 2];

                //AVGO
                response = await fetch('http://127.0.0.1:8080/AVGO/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch AVGO data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[5] = dataArray[dataArray.length - 2];

                //V
                response = await fetch('http://127.0.0.1:8080/V/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch V data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[6] = dataArray[dataArray.length - 3];

                //JPM
                response = await fetch('http://127.0.0.1:8080/JPM/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch JPM data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[7] = dataArray[dataArray.length - 1];

                //UNH
                response = await fetch('http://127.0.0.1:8080/UNH/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch UNH data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[8] = dataArray[dataArray.length - 1];

                //MA
                response = await fetch('http://127.0.0.1:8080/MA/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch MA data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[9] = dataArray[dataArray.length - 1];

                //HD
                response = await fetch('http://127.0.0.1:8080/HD/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch HD data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[10] = dataArray[dataArray.length - 1];

                //AMZN
                response = await fetch('http://127.0.0.1:8080/AMZN/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch AMZN data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[11] = dataArray[dataArray.length - 1];

                //XOM
                response = await fetch('http://127.0.0.1:8080/XOM/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch XOM data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[12] = dataArray[dataArray.length - 5];
            
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        function calculateDiffs() {
            console.log("STOCK DATA FROM DOSHIT: ", stocks);
        }

        fetchData();
        calculateDiffs();
      }, []); 

  return (
    <div className='container mt-5'>

    </div>
  );
};

export default TrendingData;
