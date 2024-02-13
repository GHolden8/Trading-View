#Imports
from errno import errorcode
import os
import json

import mysql.connector

from av_api.av_api_main import *
from database_utils import *
from mysql_connect import MySQLConnect

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "db_config.json")
config_file = open(config_path)

# database interface object
dbi = MySQLConnect(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()

# Converts a ticker symbol to a ticker id
def get_tickerid_by_symbol(symbol):
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

# Inserts a ticker into the tracked_tickers table
def insert_ticker(ticker):
    insert = f"""
        INSERT INTO tracked_tickers
        VALUES ("{ticker}", NULL, 0)
        ;
    """
    dbi.sql_execute(insert)