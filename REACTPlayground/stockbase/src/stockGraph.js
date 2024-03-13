import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const CandlestickChart = ({ symbol, startDate, endDate }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/${symbol}/daily/${startDate}/${endDate}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        const mapCandlestickData = (result) => ({
          x: new Date(result[0]),
          y: [parseFloat(result[2]), parseFloat(result[3]), parseFloat(result[4]), parseFloat(result[5])]
        });
        console.log('Result:', result);

        const info = result.data.map(mapCandlestickData);

        const options = {
          series: [{
            name: 'candle',
            data: info
          }],
          chart: {
            height: 400,
            type: 'candlestick',
          },
          title: {
            text: `Graph of ${symbol}`,
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
                return new Date(val).toLocaleString('en-US', { month: 'short', day: '2-digit', year:'numeric', hour: '2-digit', minute: '2-digit' });
              }
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        };

        const chartId = `chart-${symbol}-${startDate}-${endDate}`; // Unique ID for chart container
        const chart = new ApexCharts(document.querySelector(`#${chartId}`), options);
        chart.render();
        chart.resetSeries();
        return () => {
          chart.destroy(); // Destroy the chart when the component unmounts
        };

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [symbol, startDate, endDate]);
  return (
    <div id={`chart-${symbol}-${startDate}-${endDate}`} /> // Unique ID for chart container
  );
};

export default CandlestickChart;
