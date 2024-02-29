'''This file updates the database with the latest stock data from the
    Alpha Vantage API.'''

import json
import os

from DatabaseConnector.av_api.av_api_main import get_series
from DatabaseConnector import mysql_connect
from DatabaseConnector.database_utils import *

CONFIGS = None
config_path = os.path.join(os.getcwd(), "DatabaseConnector/av_api/api_config.json")
config_file = open(config_path)
CONFIGS = json.load(config_file)
config_file.close()

ENDPOINT = CONFIGS['api_endpoint']
API_KEY = CONFIGS['av_api_keys'][0]

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
config_path = os.path.join(current_dir, "db_config.json")
config_file = open(config_path)

# database interface object
dbi = mysql_connect.MySQLConnect(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()

def av_database_update(interval='TIME_SERIES_DAILY', fullness=False, target_stock=None):
    '''This function updates the database with the latest stock data from the Alpha Vantage API.'''
    # Get all tracked tickers
    query = """
        SELECT ticker
        FROM tracked_tickers
        ;
    """

    if target_stock:
        tickers = []
        tickers.append(target_stock)
    else:
        tickers = dbi.sql_select(query)

    # Get the latest stock data for each ticker
    for ticker in tickers:
        # Get the latest stock data for the ticker
        if(isinstance(ticker, list)):
            symbol = ticker[0]
        else:
            symbol = ticker
        data = get_series(interval, symbol, interval, API_KEY, full=fullness)

        # Insert the latest stock data into the database
        for date, values in data.items():
            insert = f"""
                INSERT INTO ticker_dataset
                VALUES (
                    (SELECT tickerid FROM tracked_tickers WHERE ticker = '{symbol}'),
                    '{date}',
                    '{interval}',
                    {values['1. open']},
                    {values['2. high']},
                    {values['3. low']},
                    {values['4. close']}
                )
                ;
            """
            dbi.sql_execute(insert)
