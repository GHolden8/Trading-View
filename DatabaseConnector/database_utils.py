'''The database utilities module.
Contains various utilities for working with the database.'''

#Imports
import os
import json

from DatabaseConnector.av_api.av_api_main import *
from DatabaseConnector.yahoo_finance.yahooFinance import *
from DatabaseConnector.mysql_connect import MySQLConnect

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "db_config.json")
with open(config_path) as config_file:
    DB_CONFIGS = json.load(config_file)

# database interface object
dbi = MySQLConnect(config_path)

def get_tickerid_by_symbol(symbol):
    """Converts a ticker symbol to a ticker id"""
    query = f"""
        SELECT tickerid
        FROM tracked_tickers
        WHERE ticker = \'{symbol}\'
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
        VALUES (\"{ticker}\", NULL, 0)
        ON DUPLICATE KEY UPDATE ticker = ticker;
    """
    dbi.sql_execute(insert)

def insert_candle(symbol, timestamp, interval, open, high, low, close):
    ''' Inserts a candle to a symbol cooresponding to passed parameters. '''
    id = get_tickerid_by_symbol(symbol)
    if id is None:
        # inserting ticker which does not exist
        insert_ticker(symbol)
        id = get_tickerid_by_symbol(symbol)

    query = f"""
    INSERT INTO ticker_dataset (
        `tickerid`,
        `timestamp`,
        `interval`,
        `open`,
        `high`,
        `low`,
        `close`
    ) VALUES (
        {id},
        "{timestamp}",
        "{interval}",
        {open},
        {high},
        {low},
        {close}
    ) ON DUPLICATE KEY UPDATE tickerid = tickerid
    ;
    """
    dbi.sql_execute(query)

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

def get_tracked_tickers():
    ''' Returns a list of all tracked tickers.'''
    query = """
    SELECT ticker
    FROM tracked_tickers
    ORDER BY ticker ASC
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
    query = """
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
        SET is_favorite = 1
        WHERE tt.ticker = \'{symbol}\';
    """
    dbi.sql_execute(query)

def remove_favorite(symbol):
    ''' Remove Symbol from Favorites '''
    query = f"""
        UPDATE tracked_tickers tt
        SET is_favorite = 0
        WHERE tt.ticker = \'{symbol}\';
    """
    dbi.sql_execute(query)

''' Bulk Download Methods '''

def bulk_download(symbols, start_epoch, end_epoch, interval):
    ''' Bulk Download a list of Symbols '''
    for symbol in symbols:
        data = retrieve_data(symbol, start_epoch, end_epoch, interval)
        counter = 0
        for candle in data:
            print(symbol, "Percent Complete:", '%2f' % (counter/len(data)*100.0))
            insert_candle(
                symbol,
                candle.get('date'),
                interval,
                candle.get('open'),
                candle.get('high'),
                candle.get('low'),
                candle.get('close')
            )
            counter += 1
    