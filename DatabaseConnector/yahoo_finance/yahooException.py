class YahooException(Exception):
    def __init__(self, msg) -> None:
        super().__init__(f"Yahoo Finance API Error: {msg}")