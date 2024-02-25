#Imports
from errno import errorcode
import os
import json

from DatabaseConnector.av_api.av_api_main import *
from DatabaseConnector.database_utils import *
from DatabaseConnector.mysql_connect import MySQLConnect

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "db_config.json")
config_file = open(config_path)

# database interface object
dbi = MySQLConnect(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()

def get_tickerid_by_symbol(symbol):
    """Converts a ticker symbol to a ticker id"""
    query = f"""
        SELECT tickerid
        FROM tracked_tickers
        WHERE ticker = '{symbol}'
        ;
    """
    db_out = dbi.sql_select(query)
    if len(db_out) == 0:
        return None
    return db_out[0][0]

def insert_ticker(ticker):
    '''Inserts a ticker into the tracked_tickers table'''
    insert = f"""
        INSERT INTO tracked_tickers
        VALUES ("{ticker}", NULL, 0)
        ;
    """
    dbi.sql_execute(insert)

def get_tickers(symbol, interval):
    ''' Returns a symbol ticker dataset at a particular interval. Must be valid interval'''
    query = f"""
    SELECT td.`timestamp`,
        td.`interval`,
        td.open,
        td.high,
        td.low,
        td.close
    FROM tracked_tickers tt
    JOIN ticker_dataset AS td
        ON td.tickerid = tt.tickerid
    WHERE tt.ticker = '{symbol}' AND td.interval = '{interval}'
    ORDER BY td.`timestamp` ASC
    ;
    """
    db_out = dbi.sql_select(query)
    if len(db_out) == 0:
        return None
    return db_out

def get_latest_price_data(symbol):
    ''' Returns the rate of change of a Symbols movement in the last 24 hours'''
    query = f"""
    SELECT tt.ticker,
        td.`open`
    FROM ticker_dataset as td
    JOIN tracked_tickers tt
        ON tt.tickerid = td.tickerid
    WHERE tt.ticker = "{symbol}"
    ORDER BY td.`timestamp` ASC
    LIMIT 2
    ;
    """
    db_out = dbi.sql_select(query)
    if len(db_out) == 0:
        return None
    return db_out
    


def get_favorites():
    ''' Returns a list of the tickers flagged as user favorites '''
    query = f"""
    SELECT ticker
    FROM tracked_tickers
    WHERE is_favorite = 1
    """
    db_out = dbi.sql_select(query)

    if len(db_out) == 0:
        return None
    return db_out

def set_favorite(symbol):
    ''' Add Symbol to Favorites '''
    query = f"""
        UPDATE tracked_tickers tt
            JOIN ticker_dataset td
                ON td.tickerid = tt.tickerid
        SET is_favorite = 1
        WHERE tt.ticker = {symbol};
    """
    dbi.sql_execute(query)

def remove_favorite(symbol):
    ''' Remove Symbol from Favorites '''
    query = f"""
        UPDATE tracked_tickers tt
            JOIN ticker_dataset td
                ON td.tickerid = tt.tickerid
        SET is_favorite = 0
        WHERE tt.ticker = {symbol};
    """
    dbi.sql_execute(query)
