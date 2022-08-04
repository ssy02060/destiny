from enum import unique
from flask import Flask, request
from pymongo import MongoClient
import os
import datetime
import sys
import json
import requests

app = Flask("review")
PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']

client = MongoClient(host=DBHOST, port=27017)
db = client['Destiny']
reviews = db.review
#reviews.create_index(["user", "movie"])
@app.route('/send_post', methods=['GET'])
def send_post():
    review_list =  {"user": "Eukgun","movie": "Harry Potter","review": { "comment": "Hmmm", "rate": 3 }}
    res = requests.post("http://192.168.5.135:4001/review", data=json.dumps(review_list))
    return res.text

@app.route('/review',methods=['GET','POST'])
def read_review():
    if request.method == 'GET':
       # reviews = db['review']
        review_list = []
        for review in reviews.find():
            review_list.append(review)
            print(review, file=sys.stderr)
        print(review_list, file=sys.stderr)
        return str(review_list)
    elif request.method == 'POST':
        params = json.loads(request.get_data(), encoding='utf-8')
        print(params, file=sys.stderr)
        if len(params) == 0:
            return 'No parameter'
        review_id = reviews.insert_one(params).inserted_id
        params_str = ''
        for key in params.keys():
            params_str += 'key: {}, value: {}<br>'.format(key, params[key])        
        return params_str

    return "review"

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=PORT, debug=True)