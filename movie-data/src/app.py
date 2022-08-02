from flask import Flask

app = Flask("api_test")

@app.route('/')
def hello():
    return 'Movie-data'

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)