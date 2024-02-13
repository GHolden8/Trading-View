#Imports
import datetime
from decimal import Decimal
from errno import errorcode
import os

from mysql_connect import MySQLConnect

import mysql.connector
from database_utils import *
import json

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "db_config.json")
config_file = open(config_path)

# database interface object
dbi = MySQLConnect(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()

# Fetch the data from the database
def fetch_data():
    query = f"""
                SELECT *
                FROM ticker_dataset
            """
    db_out = dbi.sql_select(query)
    return db_out

def fetch_tickers():
    query = f"""
                SELECT DISTINCT ticker
                FROM ticker_dataset
            """
    db_out = dbi.sql_select(query)
    return db_out

def fetch_data_by_ticker(symbol):
    # Get our ticker index
    ticker = get_tickerid_by_symbol(symbol)
    if(ticker is None):
        return None

    # Get our data for the ticker
    query = f"""
                SELECT *
                FROM ticker_dataset
                WHERE tickerid = '{ticker}'
            """
    db_out = dbi.sql_select(query)
    return db_out

# Write data into a JSON file
def write_json(data, filename):
    with open(filename,
                'w') as f:
            result = {}
            index = 0
            for row in data:
                temp = {}
                for i, col in enumerate(row):
                    if(isinstance(col, datetime.datetime)):
                        temp[i] = col.strftime("%Y-%m-%d %H:%M:%S")
                    else:
                        if(isinstance(col, Decimal)):
                            temp[i] = float(col)
                        else:
                            temp[i] = col
                        
                result[index] = temp
                index += 1
            json_result = json.dumps(result, indent = 4)
            f.write(json_result)


# Main function - For testing purposes
if(__name__ == "__main__"):
    # Fetch the data
    data = fetch_data()

    # Store old JSON data
    if(os.path.exists("ticker_data.json")):
        if(os.path.exists("ticker_data_old.json")):
            os.remove("ticker_data_old.json")
        os.rename("ticker_data.json", "ticker_data_old.json")
    
    # Write the data into a JSON file
    write_json(data, "ticker_data.json")