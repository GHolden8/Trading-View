#Imports
from errno import errorcode
import os
import random
import requests
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

AV_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "av_api/api_config.json")
config_file = open(config_path)
AV_CONFIGS = json.load(config_file)
config_file.close()

# Alphavantage update function
# Input: func, symbol, interval
# Output: None
# Exceptions thrown: RequestsException
def update_AV_data(func, symbol, interval):
    # Check our func/interval
    validate_function(func)
    validate_interval(interval)

    # Fetch the JSON data from the AV API
    api_data = get_series(func, symbol, interval)

    tickerid = get_tickerid_by_symbol(symbol)

    if tickerid is None:
        # ticker does NOT exist in tracked ticker table. Inserting.
        insert_ticker(symbol)

        # reacquire ticker id
        tickerid = get_tickerid_by_symbol(symbol)

    datareturn = False
    for key in api_data:
        if(key != "Meta Data"):
            datareturn = True
            for date in api_data[key]:
                open_ = round(float(api_data[key][date]["1. open"]), 2)
                high = round(float(api_data[key][date]["2. high"]), 2)
                low = round(float(api_data[key][date]["3. low"]), 2)
                close = round(float(api_data[key][date]["4. close"]), 2)

                # /!\ WARNING: QUERY DOES NOT ACCOUNT FOR ENUM INTERVAL /!\
                insert = f"""
                    INSERT INTO ticker_dataset
                    VALUES (
                        "{tickerid}",
                        "{date}",
                        "{interval}",
                        {open_},
                        {high},
                        {low},
                        {close}
                    ) ON DUPLICATE KEY UPDATE tickerid = tickerid
                """
                dbi.sql_execute(insert)

        
    if(not datareturn):
        print("API Failure. No Data Returned.")
        print(api_data)
        exit(1)

    # ======================================================================== 


# Main function - FOr testing purposes
if __name__ == "__main__":

    # Update the data
    update_AV_data("TIME_SERIES_INTRADAY", "IBM", "5min")