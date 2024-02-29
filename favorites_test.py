'''This module runs the fetching unit test. It tests the get_tickers function from the database_utils module.'''

import datetime
import decimal
import json
import os
import unittest

from DatabaseConnector.database_utils import insert_ticker, set_favorite,\
    get_favorites, remove_favorite

# Grab our API key from secrets
try:
    # OS environ not conducive to cross-platform dev, lets change this to a config. Private Repo
    API_KEY = "ZFH8GYRZVTGCPCIV"

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



class favorites_test(unittest.TestCase):
    def test_favorites_add(self):
        insert_ticker('MSFT')
        set_favorite('MSFT')
        faves = get_favorites()
        fave_found = False
        for favorite in faves:
            if favorite[0] == 'MSFT':
                fave_found = True
        self.assertEqual(fave_found, True)

    def test_favorites_removal(self):
        remove_favorite('MSFT')
        faves = get_favorites()
        self.assertEqual(faves, None)


if __name__ == "__main__":
    unittest.main()
