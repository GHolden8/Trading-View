''' Exceptions for the AV API Interface '''
class InvalidFunctionException(Exception):
    '''Exception raised when an invalid API function is detected'''
    def __init__(self, msg) -> None:
        super().__init__(f"Invalid API Function Detected: {msg}")

class InvalidIntervalException(Exception):
    '''Exception raised when an invalid API time interval is detected'''
    def __init__(self, msg) -> None:
        super().__init__(f"Invalid API Time Interval Detected: {msg}")
