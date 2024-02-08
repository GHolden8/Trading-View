import mysql.connector
from errno import errorcode

# Connects to a database
# Input: hostname, user, password
# Output: Connection object or string on error
# Exceptions thrown: None
def connect(hostname, user, password):
    try:
        mydb = mysql.connector.connect(
            host=hostname,
            user=user,
            password=password,
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return "Something is wrong with your user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return "Database does not exist"
        else:
            return "Error: " + str(err)
    return mydb