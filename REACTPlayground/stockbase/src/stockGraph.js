
// Takes Json input to create candle graph
import React, { useEffect, useState } from 'react';
// candle stick graph function and import
//may need npm install for chart2 to run
import React from 'react';
import { Line } from 'react-chartjs-2';

const CandlestickChart = () => {
  const [chartData, setChartData] = useState({});

//should get data from file
  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
          if (!response.ok) {
              throw new Error('Network response was not ok');
           }
            // Parse the JSON response
            const result = await response.json();
        const formattedData = {
                    datasets: [
                         //<string:symbol> use in place of GOOGL with some variable to retrieve based on chosen

                    ],
                  };
                  setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h2>*Name of current company*</h2> //heading if needed can pull company_name if in database otherwise html header in stock is fine
      <Line data={chartData} />
    </div>
  );
};

export default CandlestickChart;
