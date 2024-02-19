import requests
import datetime

from yahoo_finance import yahooException
# dissecting the request for CSV tabular output is the following:
# the request is rather simple...
ENDPOINT = "https://query1.finance.yahoo.com/v7/finance/download"
# ENDPOINT = "https://query1.finance.yahoo.com/v7/finance/download/AAPL?period1=345427200&period2=1707955200&interval=1d&events=history&includeAdjustedClose=true"

INTERVALS = {
    "1min": "N/A",
    "5min": "N/A",
    "15min": "N/A",
    "30min": "N/A",
    "60min": "N/A",
    "daily": "1d",
    "weekly": "1wk",
    "monthly": "1mo"
}


def modtime(epoch, interval):
    ''' Rounds unix epoch to last valid integer value of that period '''
    second_intervals = {
        "daily": 86400,     # one day in seconds
        "weekly": 604800,   # one week in seconds
        "monthly": 2419200  # one month in seconds
    }
    try:
        return epoch - ( epoch % second_intervals.get(interval))
    except KeyError:
        raise yahooException("Warning: Invalid Yahoo API Interval.")

def retrieve_data(asset, start_epoch, end_epoch, interval):
    '''Yahoo Finance Data acquisition. Only 'daily' 'weekly' and 'monthly' data supported.'''
    # the two data interfaces use a different interval type, which means it must be translated to their native version.
    # modify headers to mimic a browser -- this is a dirty trick...
    headers = {
        "User-Agent": "Special Agent Open Sesame 1.69"
    }

    start_epoch = modtime(start_epoch, interval)
    end_epoch = modtime(end_epoch, interval)

    # setting interval to Yahoo Finance Applicable intervals
    interval = INTERVALS.get(interval)
    if interval == "N/A":
        raise yahooException("Warning: Invalid Yahoo API Interval.")
    uri = f"{ENDPOINT}/{asset}?period1={start_epoch}&period2={end_epoch}&interval={interval}&events=history&includeAdjustedClose=true"
    
    # print(uri)

    data = requests.get(uri, headers=headers).text

    formatted_data = []
    # skips column line
    for line in data.split('\n')[1:]:
        line_cols = line.split(',')
        print(line)
        formatted_data.append(
            {
                "date": datetime.datetime.strptime(line_cols[0], '%Y-%m-%d'),
                "open": line_cols[1],
                "high": line_cols[2],
                "low": line_cols[3],
                "close": line_cols[4]
            }
        )
    return formatted_data


if __name__ == "__main__":
    # fortune 500 tickers
    # WMT -- walmart
    # AMZN -- amazon
    # XOM -- exxon
    # AAPL -- Apple


    for x in retrieve_data("AAPL", 1707696000, 1707955200, "daily"):
        print(x)
    # retrieve_data("WMT", 1707696000, 1707955200, "daily")
    # retrieve_data("AMZN", 1707696000, 1707955200, "daily")
    # retrieve_data("XOM", 1707696000, 1707955200, "daily")