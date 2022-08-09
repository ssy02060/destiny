from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
import sys

app = Flask("api_test")

PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']

@app.route('/')
def root():
    return 'Movie API'

@app.route('/movie',methods=['GET'])
def find_movie():
    client = MongoClient(host=DBHOST, port=27017)
    mydb = client['movie_data']
    parameter_dict = request.args.to_dict()
    if len(parameter_dict) == 0:
        return 'No parameter'
    else:
        for key in parameter_dict.keys():
            results = mydb.movieInfo.find({key:{'$regex':parameter_dict[key]}}, {"_id":0})
            dic = []
        for result in results:
            dic.append(result)
            print(result, file=sys.stderr)
    return jsonify(str(dic))

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
