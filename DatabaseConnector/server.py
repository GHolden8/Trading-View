from flask import Flask

from database_utils import *

app = Flask(__name__)
@app.route('/')
def root():
    return "Hello I am a server, pass me the flask."

@app.route('/<symbol:string>/<interval:string>')
def get_data(symbol, interval):
    data = get_tickers(symbol, interval)
    print(data)

    response = {
        'symbol': symbol,
        'interval': interval,
        'data': data
    }
    return response


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)