import json
import os
import unittest

from DatabaseConnector.av_api.av_api_main import get_time_series

class av_sql_test(unittest.TestCase):
    '''Tests the get_time_series function against a given JSON file.'''
    def test_sql(self):
        response = get_time_series('daily', 'AAPL', \
                    None, '2023-01-03', '2023-01-05', "ZFH8GYRZVTGCPCIV")
        test_data = json.load(open('av_test_data.json', 'r'))
        self.assertEqual(test_data, response)

if __name__ == "__main__":
    unittest.main()
