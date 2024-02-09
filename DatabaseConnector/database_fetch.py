#Imports
from errno import errorcode
from database_utils import connect
import mysql.connector
import os

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
            for row in data:
                f.write(str(row) + '\n')

# Main function - For testing purposes
if(__name__ == "__main__"):
    # Get the connection info
    coninfo = open("../config/db_info.cfg", 'r')
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

    # Fetch the data
    data = fetch_data(mydb, "main", "ticker_dataset", "*")

    # Store old JSON data
    os.remove("ticker_data_old.json")
    os.rename("ticker_data.json", "ticker_data_old.json")
    
    # Write the data into a JSON file
    write_json(data, "ticker_data.json")