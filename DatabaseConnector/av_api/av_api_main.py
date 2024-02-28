''' This module is the main module for the alpha vantage API.
    It contains the main functions for interfacing with the API. '''

import sys
import json
import os

# from DatabaseConnector.av_api.alpha_vantage.timeseries import TimeSeries
from alpha_vantage import timeseries
from DatabaseConnector.av_api.av_api_exceptions import\
     InvalidFunctionException, InvalidIntervalException

CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "api_config.json")
with open(config_path, "r") as config_file:
    CONFIGS = json.load(config_file)

ENDPOINT = CONFIGS['api_endpoint']
# key could be random, if a list were accumulated, for now it's just the first.
API_KEY = CONFIGS['av_api_keys'][0]



def get_series(function, symbol, interval, api_key, full=False):
    '''This function will return a dictionary of time series data
        for the specified symbol and time interval.'''
    ts = timeseries.TimeSeries(key=api_key, output_format='json')

    try:
        # Get time series data based on function, symbol, and interval
        if function == 'intraday':
            data, _, __ = ts.get_intraday(symbol=symbol, interval=interval,\
                                    outputsize=('full' if full else 'compact'))
        elif function == 'daily':
            data, _ = ts.get_daily(symbol=symbol, outputsize='full' if full else 'compact')
        elif function == 'weekly':
            data, _ = ts.get_weekly(symbol=symbol)
        elif function == 'monthly':
            data, _ = ts.get_monthly(symbol=symbol)
        else:
            raise ValueError("Invalid function provided: " + function)
        return data

    except ValueError as e:
        print(e)
        sys.exit(1)

def get_time_series(function, symbol, interval, start_date, end_date, api_key):
    '''This function will return a dictionary of time series data for the 
        specified symbol and time period. 
        The time series data will be filtered based on the specified time interval.'''

    try:
        # Get time series data within the specified time period
        data = get_series(function, symbol, interval, api_key, True)

        # Filter data within the specified time period
        filtered_data = {}
        for date, values in data:
            if start_date <= date <= end_date:
                filtered_data[date] = values

        return filtered_data

    except Exception as e:
        print(e)
        sys.exit(1)

def validate_function(function):
    '''Alpha vantage API Function validation function'''
    valid_functions = [
        "TIME_SERIES_INTRADAY",
        "TIME_SERIES_DAILY",
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

# Testing stuff
if __name__ == "__main__":
    response = get_time_series('daily', 'AAPL', None, '2023-01-03',\
                                '2023-01-05', API_KEY)
    with open("av_test_data.json", "w") as file:
        json.dump(response, file, ensure_ascii=False, indent=4)
