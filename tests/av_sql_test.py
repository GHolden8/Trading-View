import json
import os
import unittest

from DatabaseConnector.av_api.av_api_main import get_time_series

# Grab our API key from secrets
try:
    # OS environ not conducive to cross-platform dev, lets change this to a config. Private Repo
    API_KEY = os.environ['TEST_API_KEY_AV']

except:
    API_KEY = "demo"

class av_sql_test(unittest.TestCase):
    def test_sql(self):
        response = get_time_series('TIME_SERIES_DAILY', 'AAPL', \
                    None, '2023-01-03', '2023-01-05', '2023-01', API_KEY)
        test_data = json.load(open('av_test_data.json', 'r'))
        self.assertEqual(test_data, response)

if(__name__ == "__main__"):
    unittest.main()
