''' The abstract MySQL connector. '''

import json

from mysql.connector import connect, Error

LISCENCE = """
Abstract MYSQL Connector class property of Operational Security Solutions (OSS) All Rights Reserved.
Unauthorized Reproduction Strictly Prohibited.
"""

class MySQLConnect:
    """
    Class to Connect and interface MySQL database for query and execution instructions.
    """
    def __init__(self, config_file=None) -> None:
        self.configs = None

        # Memory safe json file import
        if config_file is not None:
            json_configs = open(config_file, 'r')
        else:
            # file location must be updated to support main relative file path.
            json_configs = open('db_config.json', 'r')

        self.configs = json.load(json_configs)
        json_configs.close()

        # loading configs
        self.host = self.configs['hostname']
        self.user = self.configs['username']
        self.password = self.configs['password']
        if self.password.lower() == 'prompt':
            self.password = input('Please enter DB Password: ')
        self.database = self.configs['schema']
        self.double_quote_escape = self.configs['double_quote_escape']

    def sql_execute(self, query):
        """
        Executes SQL query based on configuration settings. This is for things like inserting
        and updating where no
        tuple returns are requested.
        """

        # Memory Safe MySQL Connector
        try:
            with connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            ) as connection:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    connection.commit()
        except Error as e:
            print("/!\\ ERROR /!\\")
            print(e, e.__traceback__)
            print("Query: ", query)
            exit("Database Error. Program crashed. Exiting.")

    def sql_select(self, query):
        '''
        Runs query parameter and returns tables (like a select statement) then returns the tuples.
        '''
        # Memory Safe MySQL Connector
        try:
            with connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            ) as connection:
                with connection.cursor() as cursor:
                    cursor = connection.cursor(buffered=True)
                    cursor.execute(query)

                    rows = cursor.fetchall()
                    connection.commit()
                    return rows

        except Error as e:
            print("/!\\ ERROR /!\\")
            print(e, e.__traceback__)
            exit("Database Error. Program crashed. Exiting.")
        