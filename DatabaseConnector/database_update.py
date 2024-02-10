#Imports
from errno import errorcode
from database_utils import connect
import mysql.connector
import os
import random
import requests

# Alphavantage update function
# Input: mydb, database_name, func, symbol, interval
# Output: None
# Exceptions thrown: RequestsException
def update_AV_data(mydb, database_name, func, symbol, interval):
    # Get the API key
    coninfo = open("./config/av_keys.cfg", 'r')
    api_keys = []
    for candidate in coninfo:
        candidate = candidate.strip()
        if(candidate.startswith("#")):
            continue
        api_keys.append(candidate)

    # Setup DB cursor
    mycursor = mydb.cursor()
    mycursor.execute("USE " + database_name)

    # Fetch the JSON data from the AV API
    url = "https://www.alphavantage.co/query?function=" + func + "&symbol=" + symbol + "&interval=" + interval + "&apikey=" + api_keys[random.randint(0, len(api_keys) - 1)]
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(e)
        exit(1)
    data = response.json()

    # Get the ID from the symbol
    mycursor.execute(f"SELECT tickerid FROM tracked_tickers WHERE ticker = '{symbol}'")
    tickerid = mycursor.fetchall()
    tickerid = tickerid[0][0]

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
                    VALUES ("{tickerid}","{date}",{interval},{open_},{high},{low},{close})
                    ON DUPLICATE KEY UPDATE"""
                )
    mydb.commit()

# Main function - FOr testing purposes
if(__name__ == "__main__"):
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