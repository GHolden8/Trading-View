from flask import Flask

from database_utils import *

app = Flask(__name__)
@app.route('/')
def root():
    return "Hello I am a server, pass me the flask."

@app.route('/<string:symbol>/<string:interval>')
def get_data(symbol, interval):
    data = get_tickers(symbol, interval)

    formatted_data = []
    for x in data:
        formatted_data.append(
            list(x)
        )

    response = {
        'symbol': symbol,
        'interval': interval,
        'data': data
    }
    return response


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)