import json
import os
import unittest

from DatabaseConnector.database_utils import get_tickers
import DatabaseConnector.mysql_connect as mysql_connect

# Grab our API key from secrets
try:
    # OS environ not conducive to cross-platform dev, lets change this to a config. Private Repo
    API_KEY = os.environ['TEST_API_KEY_AV']

except:
    API_KEY = "demo"

# Memory safe DB config file import
DB_CONFIGS = None
current_dir = os.path.dirname(__file__)
config_path = os.path.join(current_dir, "db_config.json")
config_file = open(config_path)

# database interface object
dbi = mysql_connect.MySQLConnect(config_path)

DB_CONFIGS = json.load(config_file)
config_file.close()


def init_db():
    setupfile = None
    current_dir = os.path.abspath(os.path.join(os.getcwd(), os.pardir))
    config_path = os.path.join(current_dir, "DatabaseConnector", "sql", "daatabase_setup_script.sql")
    with open(config_path, 'r') as file:
        setupfile = file.read()
        dbi.sql_execute(setupfile)

class fetch_sql_test(unittest.TestCase):
    def test_api_fetch(self):
        init_db()
        with open('av_test_data.json', 'r') as file:
            test_data = json.load(file)
            test_json = get_tickers('AAPL', 'daily')
            self.assertEqual(test_data, test_json)

if(__name__ == "__main__"):
    unittest.main()
