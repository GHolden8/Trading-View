from flask import Flask

from DatabaseConnector.database_utils import *

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

@app.route('/favorites')
def get_favorite_tickers():
    favorites = get_favorites()
    formatted_data = []
    for x in favorites:
        ticker = x[0]
        latest_price_data = get_latest_price_data(ticker)
        print(latest_price_data)
        last_price = float(latest_price_data[0][1])
        current_price = float(latest_price_data[1][1])
        
        if last_price >= current_price: # change negative
            decrease = last_price - current_price
            change = -float(decrease/last_price)
        else: # change positive
            increase = current_price - last_price
            change = float(increase/last_price)
        
        change *= 100.0

        formatted_data.append(
            {
                "id": ticker,
                "latest": current_price,
                "percent_change": "%.2f" % change
            }
        )

    response = {
        "stocks": formatted_data
    }
    return json.dumps(response)

@app.route('/addfavorite/<string:symbol>')
def add_favorite(symbol):
    set_favorite(symbol)
    return success_handler()

@app.route('/delfavorite/<string:symbol>')
def delete_favorite(symbol):
    remove_favorite(symbol)
    return success_handler()


def success_handler():
    return r'{"success": true}'

def failure_handler():
    return r'{"success": false}'

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)