
// Takes Json input to create candle graph
import React, { useEffect, useState } from 'react';
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
            const result = await response.json();
            const data = result.map(item => ({
                      x: new Date(item[0]),
                      y:[
                       parseFloat(item[2]), // Convert to number
                       parseFloat(item[3]),
                       parseFloat(item[4]),
                       parseFloat(item[5])
                       ]
             }));
          const formattedData = {
                    datasets: [
                         //<string:symbol> use in place of GOOGL with some variable to retrieve based on chosen
                         {
                            data: data
                         }
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
      <h2>*Name of current company*</h2>
      <Line data={chartData} />
    </div>

  );
};

export default CandlestickChart;
