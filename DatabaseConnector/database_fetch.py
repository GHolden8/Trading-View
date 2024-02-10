#Imports
from errno import errorcode
from mysql_connect import MySQLConnect
import mysql.connector
import json
import os

# Memory safe DB config file import
DB_CONFIGS = None
config_file = open("db_config.json")

# database interface object
dbi = MySQLConnect(config_file)

DB_CONFIGS = json.load(config_file)
config_file.close()

# Fetch the data from the database
def fetch_data(mydb, database_name, table, columns):
    mycursor = mydb.cursor()
    mycursor.execute("USE " + database_name)
    mycursor.execute("SELECT " + columns + " FROM " + table)
    myresult = mycursor.fetchall()
    return myresult

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
    data = fetch_data(mydb, "main", "ticker_dataset", "*")

    # Store old JSON data
    os.remove("ticker_data_old.json")
    os.rename("ticker_data.json", "ticker_data_old.json")
    
    # Write the data into a JSON file
    write_json(data, "ticker_data.json")