#Imports
from errno import errorcode
from database_utils import connect
import mysql.connector
import os
import random
import requests

import json

from av_api.av_api import *
from mysql_connect import MySQLConnect

# Memory safe DB config file import
DB_CONFIGS = None
config_file = open("config.json")

# database interface object
dbi = MySQLConnect(config_file)

DB_CONFIGS = json.load(config_file)
config_file.close()

AV_CONFIGS = None
config_file = open("av_api/config.json")
AV_CONFIGS = json.load(config_file)
config_file.close()

def insert_ticker(ticker):
    insert = f"""
    INSERT INTO tracked_tickers
    `ticker` VALUES ("{ticker}")
    ;
    """
    dbi.sql_execute(insert)

# Alphavantage update function
# Input: mydb, database_name, func, symbol, interval
# Output: None
# Exceptions thrown: RequestsException
def update_AV_data(func, symbol, interval):

    data = get_series(func, symbol, interval)

    query = f"""
    SELECT DISTINCT tickerid
    FROM tracked_tickers 
    WHERE ticker = '{symbol}'
    ;
    """
    db_out = dbi.sql_select(query)
    if len(db_out) == 0:
        # ticker does NOT exist in tracked ticker table. Inserting.
        insert_ticker(symbol)

    else:
        # ticker exists in tracked ticker table, assign ticker_id
        tickerid = db_out[0][0]



    # ======================================================================== 

    # Get the ID from the symbol
    mycursor.execute(f"SELECT tickerid FROM tracked_tickers WHERE ticker = '{symbol}'")
    tickerid = mycursor.fetchall()
    tickerid = tickerid[0][0]

    # This could be a single query, just do a join on the ticker_dataset table.
    if(not tickerid):
        mycursor.execute(f"INSERT INTO tracked_tickers VALUES ('{symbol}')")
        mycursor.execute(f"SELECT tickerid FROM tracked_tickers WHERE ticker = '{symbol}'")
        tickerid = mycursor.fetchall()

    # Update the database
    for key in data:
        if(key != "Meta Data"):
            for date in data[key]:
                open_ = round(float(data[key][date]["1. open"]), 2)
                high = round(float(data[key][date]["2. high"]), 2)
                low = round(float(data[key][date]["3. low"]), 2)
                close = round(float(data[key][date]["4. close"]), 2)
                #print(
                #    f"""
                #    INSERT INTO ticker_dataset
                #    VALUES ("{symbol}","{date}",{interval},{open_},{high},{low},{close})
                #    """)
                mycursor.execute(
                    f"""
                    INSERT INTO ticker_dataset
                    VALUES ("{tickerid}","{date}",{int(interval)},{open_},{high},{low},{close})
                    ON DUPLICATE KEY UPDATE"""
                )
    mydb.commit()

# Main function - FOr testing purposes
if(__name__ == "__main__"
    # Get the connection info
    coninfo = open("./config/db_info.cfg", 'r')

    info = []
    for candidate in coninfo:
        candidate = candidate.strip()
        if(candidate.startswith("#")):
            continue
        info.append(candidate)

    # Connect to the database
    mydb = connect(info[0], info[1], info[2])

    # Error checking
    if(isinstance(mydb, str)):
        print(mydb)
        exit(1)

    # Update the data
    update_AV_data(mydb, "stocktracker", "TIME_SERIES_INTRADAY", "IBM", "5")