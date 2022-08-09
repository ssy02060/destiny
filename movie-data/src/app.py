from flask import Flask, request
from pymongo import MongoClient
import os


app = Flask("api_test")

PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']

@app.route('/')
def root():
    parameter_dict = request.args.to_dict()
    if len(parameter_dict) == 0:
        return 'No parameter'

    parameters = ''
    for key in parameter_dict.keys():
        parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
    return 'Movie API'

@app.route('/movie')
def year_find_movie():
    client = MongoClient(host=DBHOST, port=27017)
    mydb = client['movie_data']

    parameter_dict = request.args.to_dict()
    if len(parameter_dict) == 0:
        return 'No parameter'

    parameters = ''
    for key in parameter_dict.keys():
        parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
    
    return mydb.movieInfo.delete_many({"openYear":request.args[key]})

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
