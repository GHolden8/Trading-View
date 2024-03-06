
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CandlestickChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*const response = await fetch('http://127.0.0.1:8080/GOOGL/daily');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const data = result.map(item => ({
          x: new Date(item[0]),
          y: [
            parseFloat(item[1]), // Open
            parseFloat(item[2]), // High
            parseFloat(item[3]), // Low
            parseFloat(item[4])  // Close
          ]
        }));*/
        const formattedData = {
          datasets: [
            {
              //data:data
              data: [
                {
                  x: new Date("Thu, 25 Feb 2010 00:00:00 GMT"),
                  y: [
                    parseFloat("13.19"),
                    parseFloat("13.23"),
                    parseFloat("13.01"),
                    parseFloat("13.17")
                  ]
                }
              ]
            }
          ]
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
