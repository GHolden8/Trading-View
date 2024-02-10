#Imports
from errno import errorcode
from mysql_connect import MySQLConnect
import mysql.connector
import json
import os

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

# Write data into a JSON file
def write_json(data, filename):
    with open(filename,
                'w') as f:
            result = {}
            for row in data:
                temp = {}
                for i, col in enumerate(row):
                    temp[i] = col
                result.append(temp)
            json_result = json.dumps(result)
            f.write(json_result)


# Main function - For testing purposes
if(__name__ == "__main__"):
    # Fetch the data
    data = fetch_data()

    # Store old JSON data
    os.remove("ticker_data_old.json")
    os.rename("ticker_data.json", "ticker_data_old.json")
    
    # Write the data into a JSON file
    write_json(data, "ticker_data.json")