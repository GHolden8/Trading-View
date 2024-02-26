'''This module runs the fetching unit test. It tests the get_tickers function from the database_utils module.'''

import json
import os
import re
import unittest

import mysql.connector as m

from DatabaseConnector.database_utils import get_tickers, insert_ticker
from DatabaseConnector.av_api.av_database_update import av_database_update

# Grab our API key from secrets
try:
    # OS environ not conducive to cross-platform dev, lets change this to a config. Private Repo
    API_KEY = os.environ['TEST_API_KEY_AV']

except:
    API_KEY = "demo"

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "DatabaseConnector/db_config.json")
config_file = open(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()
db_user = DB_CONFIGS['username']
db_pass = DB_CONFIGS['password']

class fetch_sql_test(unittest.TestCase):
    def test_fetch_sql(self):
        with open('tests/av_test_data.json', 'r') as file:
            test_data = json.load(file)
            insert_ticker('AAPL')
            av_database_update('daily', True, 'AAPL')
            test_json = get_tickers('AAPL', 'daily')
            # Compare the two jsons by row, excluding the tickerid
            for test_data_sample, i in test_data:
                self.assertEqual(test_data_sample, test_json[i])

if __name__ == "__main__":
    unittest.main()
