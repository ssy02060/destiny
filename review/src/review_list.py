from contextlib import nullcontext
from enum import unique
from flask import Flask, request
from pymongo import MongoClient
import os
import sys
import json
import requests

app = Flask("review")
PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']

client = MongoClient(host=DBHOST, port=27017)
db = client['Destiny']
reviews = db.reviews

#json schema
vexpr = {
        "$jsonSchema" : {
            "title" : "reviews",
            "description" : "reviews schema contains userId, movieCd, review",
            "bsonType" : "object",
            "required" : ["userId", "movieCd"],
            "properties" : {
                "userId" : {
                    "bsonType" : "string",
                },
                "movieCd" : {
                    "bsonType" : "string",
                },
                "review" : {
                    "bsonType" : "object",
                },
            },
        }
    }
db.command({
    'collMod': "reviews",
    'validator': vexpr,
    'validationLevel': "moderate"
})
db.reviews.create_index(
    [('userId', 1), ('movieCd', 1)], name='userId', unique=True)
    
# json-POST
@app.route('/send_post', methods=['GET'])
def send_post():
    review_list =  {"userId": "Seo","movieCd": "2222","review": { "comment": "Cool", "rate": 2 }}
    res = requests.post("http://192.168.5.135:4001/review", data=json.dumps(review_list))
    return res.text

# reading review and insert review
@app.route('/review',methods=['GET','POST'])
def read_review():
    print(type(request.args.get('userId')),file=sys.stderr)
    a = request.args.get('userId')
    print(type(a),file=sys.stderr)
    if request.method == 'GET':
        review_list = []
        for review in reviews.find():
            review_list.append(review)
        return str(review_list)
    elif request.method == 'POST':
        params = json.loads(request.get_data(), encoding='utf-8')
        print(params, file=sys.stderr)
        if len(params) == 0:
            return 'No parameter'
    # elif request.method == 'GET' & request.args.get('userId') >= 1:
    #     print("Gooood", file=sys.stderr)
    #     return "Gooood"
        try:
            review_id = reviews.insert_one(params).inserted_id
            params_str = ''
            for key in params.keys():
                params_str += 'key: {}, value: {}<br>'.format(key, params[key]) 
            return params_str    
        except:
            return "리뷰가 중복되거나 올바르지 않습니다."   #추후 업데이트 필요
    return "review"

# review delete
@app.route('/review', methods=['DELETE'])
def delete_review():
    print(request.args.get('userId'),request.args.get('movieCd'), file=sys.stderr)
    reviews.delete_one({"userId":request.args.get('userId'),"movieCd":request.args.get('movieCd')})
    return "Delete Complete" #추후 업데이트 필요

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=PORT, debug=True)