class InvalidFunctionException(Exception):
    def __init__(self, msg) -> None:
        super().__init__(f"Invalid API Function Detected: {msg}")

class InvalidIntervalException(Exception):
    def __init__(self, msg) -> None:
        super().__init__(f"Invalid API Time Interval Detected: {msg}")