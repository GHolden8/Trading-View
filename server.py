from flask import Flask, request, jsonify
from flask_cors import CORS
from threading import Thread
from time import sleep, time
import sys
import subprocess

from DatabaseConnector.database_utils import *
from DatabaseConnector.yahoo_finance.yahooFinance import modtime
from autoupdate import autoupdate

# DB config import for when we need to do direct DB ops
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "DatabaseConnector/db_config.json")
config_file = open(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()
db_user = DB_CONFIGS['username']
db_pass = DB_CONFIGS['password']

app = Flask(__name__)
@app.route('/')
def root():
    return "Hello I am a server, pass me the flask."

@app.route('/<string:symbol>/<string:interval>')
def get_data(symbol, interval):
    data = get_tickers(symbol, interval)

    formatted_data = []
    for x in data:
        formatted_data.append(
            list(x)
        )

    response = {
        'symbol': symbol,
        'interval': interval,
        'data': data
    }
    return response

@app.route('/nonfavorites')
def at_a_glance():
    formatted_data = []
    for x in get_non_favorites():
        ticker = x[0]
        latest_price_data = get_latest_price_data(ticker)
        last_price = float(latest_price_data[0][1])
        current_price = float(latest_price_data[1][1])
        
        if last_price >= current_price: # change negative
            decrease = last_price - current_price
            change = -float(decrease/last_price)
        else: # change positive
            increase = current_price - last_price
            change = float(increase/last_price)
        
        change *= 100.0

        formatted_data.append(
            {
                "id": ticker,
                "latest": current_price,
                "percent_change": "%.2f" % change
            }
        )

    response = {
        "stocks": formatted_data
    }
    return json.dumps(response)

@app.route('/favorites')
def get_favorite_tickers():
    favorites = get_favorites()
    formatted_data = []

    if(favorites == None):
        return json.dumps(None)

    for x in favorites:
        ticker = x[0]
        latest_price_data = get_latest_price_data(ticker)
        last_price = float(latest_price_data[0][1])
        current_price = float(latest_price_data[1][1])
        
        if last_price >= current_price: # change negative
            decrease = last_price - current_price
            change = -float(decrease/last_price)
        else: # change positive
            increase = current_price - last_price
            change = float(increase/last_price)
        
        change *= 100.0

        formatted_data.append(
            {
                "id": ticker,
                "latest": current_price,
                "percent_change": "%.2f" % change
            }
        )

    response = {
        "stocks": formatted_data
    }
    return json.dumps(response)

@app.route('/addfavorite/<string:symbol>')
def add_favorite(symbol):
    set_favorite(symbol)
    return success_handler()

@app.route('/delfavorite/<string:symbol>')
def delete_favorite(symbol):
    remove_favorite(symbol)
    return success_handler()


def success_handler():
    return r'{"success": true}'

def failure_handler():
    return r'{"success": false}'

STOCKS = [
    'AAPL'
    'MSFT',
    'NVDA',
    'GOOGL',
    'META',
    'BRK.B',
    'LLY',
    'TSLA',
    'AVGO',
    'V',
    'JPM',
    'UNH',
    'MA',
    'HD',
    'AMZN',
    'XOM'
]

INTERVAL_LIST = [
    'daily'
]

if __name__ == "__main__":
    args = sys.argv
    for arg in args:
        arg = arg.lower()

    # CORS Hotfix
    CORS(app)
    cors = CORS(app, resource={
        r"/*":{
            "origins":"*"
        }
    })

    if '--build' in args:
        if input("Nuke Database? This will wipe ALL price data! Y/n: ").lower() == 'y':
            print("Droping and Rebuilding DB in 5 seconds...")
            sleep(5)
            # nuke + rebuild DB
            db_script_file = open("DatabaseConnector/sql/database_setup_script.sql", 'r')
            db_script = db_script_file.read()
            subprocess.call(["mysql", f"-u{db_user}", f"-p{db_pass}", f"-e {db_script}"])
            print("Buld script executed. Exiting.")
            exit(0)

        else:
            print("aborted.")
            exit(1)

    if '--populate' in args:
        # populate with current data
        if input("Bulk Download ALL price data? Y/n: ").lower() == 'y':
            print("\n")
            print("Relentlessly scraping Yahoo Finance in 5...\n")
            for i in range(4):
                sleep(1)
            print("Please be patient. Bulk Downloading...")
            for interval in INTERVAL_LIST:
                # timestamp of 1267079403 is twelve years ago.
                bulk_download(STOCKS, 1267079403, time(), interval)

        else:
            print("aborted.")
            exit(1)

    if '--update' in args:
        # update db for last seven days of price data.
        epoch_time = int(time())
        lastmod = modtime(epoch_time, "weekly")
        
        print("Updating weekly price data...")
        for interval in INTERVAL_LIST:
            bulk_download(STOCKS, lastmod, time(), interval)

        print("Database update complete for the last week.")

    if '--initfavorite' in args:
        set_favorite("NVDA")

    if '--exitafter' in args:
        print("All updates complete.")
        exit(0)

    print("Starting updating task...")
    subprocess.run("python3 autoupdate.py", shell=True)

    print("Starting server...")
    app.run(host="127.0.0.1", port=8080)
