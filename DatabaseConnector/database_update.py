#Imports
from errno import errorcode
from database_utils import connect
import requests
import mysql.connector
import os

# Alphavantage update function
def update_AV_data(mydb, database_name, func, symbol, interval, api_key):
    mycursor = mydb.cursor()
    mycursor.execute("USE " + database_name)

    # Fetch the JSON data from the AV API
    url = "https://www.alphavantage.co/query?function=" + func + "&symbol=" + symbol + "&interval=" + interval + "&apikey=" + api_key
    response = requests.get(url)
    data = response.json()

    # Update the database
    for key in data:
        if(key != "Meta Data"):
            for date in data[key]:
                mycursor.execute("INSERT INTO ticker_dataset (ticker, timestamp, interval, open, high, low, close) VALUES (%s, %s, %s, %s, %s, %s, %s)", (symbol, date, interval, data[key][date]["1. open"], data[key][date]["2. high"], data[key][date]["3. low"], data[key][date]["4. close"]))
    mydb.commit()

# Main function
if(__name__ == "__main__"):
    # Get the connection info
    coninfo = open("./config/db_info.cfg", 'r')
    coninfo.readline()
    hostname = coninfo.readline().strip()
    user = coninfo.readline().strip()
    password = coninfo.readline().strip()

    # Connect to the database
    mydb = connect(hostname, user, password)

    # Error checking
    if(isinstance(mydb, str)):
        print(mydb)
        exit(1)

    # Update the data
    update_AV_data(mydb, "stocktracker", "TIME_SERIES_INTRADAY", "IBM", "5min", "demo")