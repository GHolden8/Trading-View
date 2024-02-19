from flask import Flask

app = Flask(__name__)
@app.route('/')
def root():
    return "Hello I am a server, pass me the flask."

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080)