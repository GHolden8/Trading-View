
import React, { useEffect, useState } from 'react';
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

function TrendingData() {
        const [stockData, setStockData] = useState([]);

        let biggestGains  = [];  //STORE INDEXES OF BIGGEST GAINS
        let biggestLosses = [];  //STORE INDEXES OF BIGGEST LOSSES
        const stockDiffs  = [];  //STORE STOCK CHANGES ()
        const stockNames  = ["NVDA", "GOOGL", "META", "LLY", "TSLA", "AVGO", "V", "JPM", "UNH", "MA", "HD", "AMZN", "XOM"];

        //Returns the daily stock change for a single stock
        function percentageDiff(stockNum){
            let arr = stockData[stockNum];
            let v1 = arr[2];
            let v2 = arr[5];
            let top = (v2 - v1);
            let solution;
            solution = (top / v1) * 100;
            return solution;
        }

        //Calculates daily change for every stock
        function calculateDiffs() {
            console.log("MADE IT HERE");
            console.log("STOCK DATA: ", stockData);
            for(var i=0; i<stockData.length; i++){
                stockDiffs.push([percentageDiff(i), stockNames[i], i]);
            }
        }

        //Sorts stocks in order from best change to worst
        function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] > b[0]) ? -1 : 1;
            }
        }

        //Sorts stocks in order from worst change to best
        function reverseSortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }

        function getBiggestGains(){
            stockDiffs.sort(sortFunction);
            for(let i=0; i<5; i++){
                if(stockDiffs[i][0] > 0){
                    biggestGains[i] = stockDiffs[i];
                } else {
                    biggestGains[i] = [0,"NONE"];
                }
            }
            console.log("GAINERS: ", biggestGains);
        }

        function getBiggestLosses(){
            stockDiffs.sort(reverseSortFunction);
            for(let i=0; i<5; i++){
                if(stockDiffs[i][0] < 0){
                    biggestLosses[i] = stockDiffs[i];
                } else {
                    biggestLosses[i] = [0,"NONE"];
                }
            }
            console.log("LOSSES: ", biggestLosses);
        }

    console.log("BEFORE EFFECT");
    useEffect(() => {    
        const stocks = [];  //STORE ALL STOCK VALUES
        console.log("MADE IT IT TO THE EFFECT");

        const fetchData = async () => {
            console.log("MADE IT IT TO THE EFFECT 2");
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
                stocks[4] = dataArray[dataArray.length - 1];

                //AVGO
                response = await fetch('http://127.0.0.1:8080/AVGO/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch AVGO data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[5] = dataArray[dataArray.length - 1];

                //V
                response = await fetch('http://127.0.0.1:8080/V/daily');
                if (!response.ok) {
                    throw new Error('Could not fetch V data');
                }
                result = await response.json();
                dataArray = result.data;
                stocks[6] = dataArray[dataArray.length - 1];

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
                stocks[12] = dataArray[dataArray.length - 1];
            
                setStockData(stocks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();

    }, []);
    console.log("AFTER EFECT");

    //Waits for all stock data to load
    //while(!isLoading){}
    console.log("FINAL STOCK DATA: ", stockData);
    calculateDiffs();
    getBiggestGains();
    getBiggestLosses();

    const gainColumns = [
        {
            name: '',
            selector: row => row.title
        },
        {
            name: 'Biggest Gains',
            selector: row => row.price
        },
        {
            name: '',
            selector: row => row.gain
        }
    ];        
    
    const lossColumns = [
        {
            name: '',
            selector: row => row.title
        },
        {
            name: 'Biggest Losses',
            selector: row => row.price
        },
        {
            name: '',
            selector: row => row.gain
        }
    ];

    const gainData = [
        {
            id: 1,
            title: stockNames[biggestGains[0][1]],
            price: stockData[biggestGains[0][2]][5],
            gain: biggestGains[0][0]
        },
        {
            id: 2,
            title: stockNames[biggestGains[1][1]],
            price: stockData[biggestGains[1][2]][5],
            gain: biggestGains[1][0]
        },
        {
            id: 3,
            title: stockNames[biggestGains[2][1]],
            price: stockData[biggestGains[2][2]][5],
            gain: biggestGains[2][0]
        },
        {
            id: 4,
            title: stockNames[biggestGains[3][1]],
            price: stockData[biggestGains[3][2]][5],
            gain: biggestGains[3][0]
        },
        {
            id: 5,
            title: stockNames[biggestGains[4][1]],
            price: stockData[biggestGains[4][2]][5],
            gain: biggestGains[4][0]
        }
    ];

    const lossData = [
        {
            id: 1,
            title: stockNames[biggestLosses[0][1]],
            price: stockData[biggestLosses[0][2]][5],
            gain: biggestLosses[0][0]
        },
        {
            id: 2,
            title: stockNames[biggestLosses[1][1]],
            price: stockData[biggestLosses[1][2]][5],
            gain: biggestLosses[1][0]
        },
        {
            id: 3,
            title: stockNames[biggestLosses[2][1]],
            price: stockData[biggestLosses[2][2]][5],
            gain: biggestLosses[2][0]
        },
        {
            id: 4,
            title: stockNames[biggestLosses[3][1]],
            price: stockData[biggestLosses[3][2]][5],
            gain: biggestLosses[3][0]
        },
        {
            id: 5,
            title: stockNames[biggestLosses[4][1]],
            price: stockData[biggestLosses[4][2]][5],
            gain: biggestLosses[4][0]
        }
    ];

    return (
        <div className='container mt-5'>
            <DataTable
                columns={gainColumns}
                data={gainData}
            ></DataTable>
            <DataTable
                columns={lossColumns}
                data={lossData}
            ></DataTable>
        </div>
    );   
};

export default TrendingData;
