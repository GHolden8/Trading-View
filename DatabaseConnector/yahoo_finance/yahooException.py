''' Yahoo Finance exceptions '''

class YahooException(Exception):
    ''' Generalized YF API Exception '''
    def __init__(self, msg) -> None:
        super().__init__(f"Yahoo Finance API Error: {msg}")