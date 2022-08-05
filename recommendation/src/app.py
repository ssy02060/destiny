import boto3
import os
from flask import Flask

app = Flask("api_test")

PORT = os.environ['PORT']

@app.route('/')
def hello():
    return 'recommendation'

@app.route('/genreNm')
def genre_recommend():
    return 'genre_recommend'

@app.route('/directors')
def genre_recommend():
    return 'directors_recommend'

@app.route('/userid')
def genre_recommend():
    return 'userid_recommend'

@app.route('/actors')
def genre_recommend():
    return 'actors_recommend'

@app.route('/prdtYear')
def genre_recommend():
    return 'prdtYear_recommend'


if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)