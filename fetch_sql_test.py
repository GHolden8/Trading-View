'''This module runs the fetching unit test. It tests the get_tickers function from the database_utils module.'''

import datetime
import decimal
import json
import os
import unittest


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
            
            i = 0
            initial_date = datetime.datetime(2023, 1, 3)
            while test_json[i][0] < initial_date:
                i += 1
            for row in test_data:
                rowtime = datetime.datetime.strptime(row, "%Y-%m-%d")
                self.assertEqual(rowtime, test_json[i][0])
                self.assertEqual(round(decimal.Decimal\
                    (test_data[row]["1. open"]), 2), test_json[i][2])
                self.assertEqual(round(decimal.Decimal\
                    (test_data[row]["2. high"]), 2), test_json[i][3])
                self.assertEqual(round(decimal.Decimal\
                    (test_data[row]["3. low"]), 2), test_json[i][4])
                self.assertEqual(round(decimal.Decimal\
                    (test_data[row]["4. close"]), 2), test_json[i][5])
                i+=1

if __name__ == "__main__":
    unittest.main()
