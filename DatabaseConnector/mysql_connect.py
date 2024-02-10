from mysql.connector import connect, Error
import json

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
        self.host = self.configs['mysql']['host']
        self.user = self.configs['mysql']['user']
        self.password = self.configs['mysql']['password']
        if self.password.lower() == 'prompt':
            self.password = input('Please enter DB Password: ')
        self.database = self.configs['mysql']['database']
        self.double_quote_escape = self.configs['mysql']['double_quote_escape']

    def sql_execute(self, query):
        """
        Executes SQL query based on configuration settings. This is for things like inserting and updating where no
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
            print(e, e.with_traceback())
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
                    result = cursor.execute(query)
                    
                    rows = cursor.fetchall()
                    connection.commit()
                    return rows

        except Error as e:
            print("/!\\ ERROR /!\\")
            print(e.with_traceback())
            exit("Database Error. Program crashed. Exiting.")
        