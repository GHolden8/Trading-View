'''
Automatic daily database update script.
Updates the database each day.
'''
from time import sleep, time
from DatabaseConnector.database_utils import bulk_download
from DatabaseConnector.yahoo_finance.yahooFinance import modtime


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
    epoch_time = int(time())
    lastmod = modtime(epoch_time, "weekly")

    while True:
        print("Initiating daily stock update...")
        for interval in INTERVAL_LIST:
            bulk_download(STOCKS, lastmod, time(), interval)
        print("Daily stock update complete. Waiting for next day.")

        lastmod = int(time()) + 86400 # Last day plus one day
        sleep(lastmod - int(time()))
