import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const CandlestickChart = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = fetch('http://127.0.0.1:8080/GOOGL/daily');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const info = result.map(item => ({
          x: new Date(item[0]),
          y: [parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4])]
        }));

        const options = {
          series: [{
            name: 'candle',
            data: info
          }],
          chart: {
            height: 350,
            type: 'candlestick',
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          annotations: {
            xaxis: [
              {
                x: 'day',
                borderColor: '#00E396',
                label: {
                  borderColor: '#00E396',
                  style: {
                    fontSize: '12px',
                    color: '#fff',
                    background: '#00E396'
                  },
                  orientation: 'horizontal',
                  offsetY: 7,
                  text: 'Test'
                }
              }
            ]
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function (val) {
                return new Date(val).toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
              }
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => {
          chart.destroy(); // Destroy the chart when the component unmounts
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div id="chart" />
  );
};

export default CandlestickChart;
