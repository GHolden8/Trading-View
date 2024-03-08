import json
import os
import unittest

from DatabaseConnector.av_api.av_api_main import get_time_series

# Grab our API key from secrets
API_KEY = "ZFH8GYRZVTGCPCIV"

class av_sql_test(unittest.TestCase):
    def test_sql(self):
        response = get_time_series('TIME_SERIES_DAILY', 'AAPL', None, '2023-01-03', '2023-01-05', API_KEY)
        test_data = json.load(open('av_test_data.json', 'r'))
        self.assertEqual(test_data, response)

if(__name__ == "__main__"):
    unittest.main()
