import os
import requests
import unittest

# Grab our API key from secrets
try:
    # OS environ not conducive to cross-platform dev, lets change this to a config. Private Repo
    API_KEY = os.environ['TEST_API_KEY_AV']

except Exception:
    API_KEY = "demo"

class av_api_test(unittest.TestCase):
    '''Tests the AV API fetching function'''
    def test_api_fetch(self):
        # Get the API data in JSON format
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=' + API_KEY
        r = requests.get(url)
        data = r.json()

        # Make sure we got some data back
        self.assertTrue(data is not None)

if __name__ == "__main__":
    unittest.main()
