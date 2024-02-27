// Takes Json input to create candle graph
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CandlestickChart = () => {
  const [chartData, setChartData] = useState({});

//should get data from file
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch('touchGrass.file');   need file
        const jsonData = await response.json();
        const formattedData = formatData(jsonData);
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatData = (data) => {
    // I think this is current format???
    // { datasets: [{ data: [{ t: 1, h: 15, l: 5, c: 12 }] }] } time, high, low, close?
  };

  return (
    <div>
      //<h2>*Name of current company*</h2> heading if needed can pull company_name if in database
      <Line data={chartData} />
    </div>
  );
};

export default CandlestickChart;
