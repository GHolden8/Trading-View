import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import './TrendingStocks.css';
import { tableOneStyles } from './tableStyle.jsx';
import { tableTwoStyles } from './tableStyle.jsx';

function TrendingData() {
    const navigate = useNavigate();
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const stockNames = ["NVDA", "GOOGL", "META", "LLY", "TSLA", "AVGO", "V", "JPM", "UNH", "MA", "HD", "AMZN", "XOM"];

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async (stockSymbol) => {
            const response = await fetch(`http://127.0.0.1:8080/${stockSymbol}/daily`);
            if (!response.ok) {
                throw new Error(`Could not fetch ${stockSymbol} data`);
            }
            const result = await response.json();
            const dataArray = result.data;
            return dataArray[dataArray.length - 1];
        };

        Promise.all(stockNames.map(symbol => fetchData(symbol)))
            .then(data => {
                setStockData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const calculateDiffs = () => {
        return stockData.map((data, index) => {
            const open = data[2];
            const close = data[5];
            const diff = ((close - open) / open) * 100;
            return { diff, name: stockNames[index] };
        });
    };

    const formattedData = () => {
        const diffs = calculateDiffs();
        const gains = diffs.filter(d => d.diff > 0).sort((a, b) => b.diff - a.diff).slice(0, 5);
        const losses = diffs.filter(d => d.diff < 0).sort((a, b) => a.diff - b.diff).slice(0, 5);
        return { gains, losses };
    };

    const columns = [
        {
            name: 'Stock',
            selector: row => row.name
        },
        {
            name: 'Change',
            selector: row => `${row.diff.toFixed(2)}%`,
            sortable: true,
        }
    ];

    const handleRowClick = (row) => {
        navigate(`/stockexaminer/${row.name}`);
    };

    const handleItemClick = (item) => {
        navigate(`/stockexaminer/${item.name}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const { gains, losses } = formattedData();

    const stockList = stockNames.map((name, index) => ({
        id: index + 1,
        name: name
    }));

    return (
        <div className ="trending-stocks-body">
        <div className='container-mt-5'>
            <h2>All Stocks</h2>
             <div className="clickable-list">
                <ul>
                    {stockList.map(item => (
                    <li key={item.id} onClick={() => handleItemClick(item)}>
                        {item.name}
                    </li>
                    ))}
                </ul>
            </div>
            <div className='dataTable'>
            <h2>Biggest Gains</h2>
            <DataTable columns={columns} data={gains} onRowClicked={handleRowClick} customStyles={tableOneStyles}/>
            <h2>Biggest Losses</h2>
            <DataTable columns={columns} data={losses} onRowClicked={handleRowClick} customStyles={tableTwoStyles}/>
            </div>
        </div>
        </div>
    );   
}

export default TrendingData;