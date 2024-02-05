import os
import requests
import unittest

# Grab our API key from secrets
API_KEY = os.environ['TEST_API_KEY_AV']

def test_api():
    # Get the API data in JSON format
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=' + API_KEY
    r = requests.get(url)
    data = r.json()

    # Make sure we got some data back
    assertTrue(data is not None)

if(__name__ == "__main__"):
    test_api()