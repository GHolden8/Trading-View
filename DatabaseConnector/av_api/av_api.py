import requests
import json

from av_api_exceptions import InvalidFunctionException, InvalidIntervalException

CONFIGS = None
config_file = open("config.json")
CONFIGS = json.load(config_file)
config_file.close()

ENDPOINT = CONFIGS['api_endpoint']
# key could be random, if a list were accumulated, for now it's just the first.
API_KEY = CONFIGS['av_api_keys'][0]



def get_series(function, symbol, interval):
    # Fetch the JSON data from the AV API
    
    url = f"ENDPOINT/query?function={function}&symbol={symbol}&interval={interval}&apikey={API_KEY}"
    
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(e)
        exit(1)
    return response.json()

def validate_function(function):
    "Alpha vantage API Function validation function"
    valid_functions = [
        "TIME_SERIES_INTRADAY",
        "TUNE_SERIES_DAILY",
        "TIME_SERIES_DAILY_ADJUSTED"
    ]
    if function not in valid_functions:
        raise InvalidFunctionException(f"{function} is not a valid function. Check Docs.")
    
def validate_interval(interval):
    intervals = [
        '1min',
        '5min',
        '15min',
        '30min',
        '60min',
        'daily',
        'weekly',
        'monthly'
    ]
    if interval not in intervals:
        raise InvalidIntervalException(f"{interval} is not a valid time interval.")