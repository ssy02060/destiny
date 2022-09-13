from contextlib import nullcontext
from enum import unique
from flask import Flask, request, Response
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
import sys
import json
import requests

app = Flask("review")
PORT = os.environ['PORT']
DB_PASSWORD = os.environ['DB_PASSWORD']
reader_endpoint = os.environ['READER_ENDPOINT']
writer_endpoint  = os.environ['WRITER_ENDPOINT']

client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
db = client['Destiny']
reviews = db.reviews

#json schema
# vexpr = {
#         "$jsonSchema" : {
#             "title" : "reviews",
#             "description" : "reviews schema contains userId, movieCd, review",
#             "bsonType" : "object",
#             "required" : ["userId", "movieCd"],
#             "properties" : {
#                 "userId" : {
#                     "bsonType" : "string",
#                 },
#                 "movieCd" : {
#                     "bsonType" : "string",
#                 },
#                 "review" : {
#                     "bsonType" : "object",
#                 },
#             },
#         }
#     }
# db.command({
#     'collMod': "reviews",
#     'validator': vexpr,
#     'validationLevel': "moderate"
# })
db.reviews.create_index(
    [('userId', 1), ('movieCd', 1)], name='userId', unique=True)
    
# json-POST
@app.route('/send_post', methods=['GET'])
def send_post():
    review_list =  {"userId": "Eukgun","movieCd": "2222","review": { "comment":"m", "rate":2}}
    res = requests.post("http://192.168.5.128:4000/review", data=json.dumps(review_list))
    return res.text

# json-UPDATE
@app.route('/send_update', methods=['GET'])
def send_update():
    review_list =  {"userId": "Eukgun","movieCd": "2221","review": { "comment":"not good", "rate":0.5}}
    res = requests.put("http://192.168.5.128:4000/review?_id=62f1a7c894a14052b20d96f9", data=json.dumps(review_list))
    return res.text

# reading review and insert review
@app.route('/review',methods=['GET','POST'])
def read_review():
    if request.method == 'GET':
        parameter_dict = request.args.to_dict()
        if len(parameter_dict) == 0:
            review_list = []
            for review in reviews.find():
                review_list.append(review)
            return Response(str(review_list), status=200, mimetype='application/json')
        else:
            parameters = ''
            parameter_dict = request.args.to_dict()
            for key in parameter_dict.keys():
                parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
            if key == "userId": #한 유저의 리뷰 목록
                review_list = []
                for review in reviews.find({"userId":request.args[key]}):
                    review_list.append(review)
                if len(review_list) == 0:
                    return Response("Check your user ID", status=404, mimetype='application/json')   
                else:
                    return Response(str(review_list), status=200, mimetype='application/json')     
            elif key == "movieCd": #한 영화의 리뷰 목록
                review_list = []
                for review in reviews.find({"movieCd":request.args[key]}):
                    review_list.append(review)
                if len(review_list) == 0:
                    return Response("Check movie code", status=404, mimetype='application/json')
                else:
                    return Response(str(review_list), status=200, mimetype='application/json')
            elif key == "_id": #리뷰 개별보기
                review_list = []
                try:
                    for review in reviews.find({"_id":ObjectId(request.args[key])}):
                        review_list.append(review)
                    return Response(str(review_list), status=200, mimetype='application/json')
                except:
                    return Response("Review Not Found!", status=404, mimetype='application/json')
            else:
                return Response("No Parameter", status=404, mimetype='application/json')
    elif request.method == 'POST': #리뷰 등록
        params = json.loads(request.get_data(), encoding='utf-8')
        if len(params) == 0:
            return Response("Empty body", status=404, mimetype='application/json')
        try:
            review_id = reviews.insert_one(params).inserted_id
            params_str = ''
            for key in params.keys():
                params_str += 'key: {}, value: {}<br>'.format(key, params[key]) 
            return Response("Successfully insert!", status=200, mimetype='application/json')
        except:
            return Response("Duplicated insert!", status=400, mimetype='application/json')
    

# review delete
@app.route('/review', methods=['DELETE'])
def delete_review():
    parameters = ''
    parameter_dict = request.args.to_dict()
    a=[]
    b=[]
    for key in parameter_dict.keys():
        parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
        a.append(key)
        b.append(request.args[key])
    print(b,file=sys.stderr)
    try:
        if a[0] == "userId" and a[1] == "movieCd":
            review_list = []
            for review in reviews.find({"userId":b[0],"movieCd":b[1]}):
                review_list.append(review)
            if len(review_list) == 0:
                return Response("User & Movie Not Found!", status=404, mimetype='application/json')
            else:
                reviews.delete_one({"userId":request.args.get('userId'),"movieCd":request.args.get('movieCd')})
                return Response("Successfully deleted!", status=200, mimetype='application/json')
        else:
            return Response("No parameter", status=400, mimetype='application/json')
    except:
        return Response("Error", status=400, mimetype='application/json')
# review update
@app.route('/review', methods=['PUT'])
def update_review():
    try:
        params = json.loads(request.get_data(), encoding='utf-8')
        params_str = ''
        for key in params.keys():
            params_str += 'key: {}, value: {}\n'.format(key, params[key]) 
        # parameters = ''
        # parameter_dict = request.args.to_dict()
        # for key in parameter_dict.keys():
        #     parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
        review_id = reviews.update_one({"_id":ObjectId(request.args['_id'])}, {"$set":{"review":params['review']}})
        return Response("Successfully updated!", status=200, mimetype='application/json')
    except:
        return Response("Review Not Found!", status=404, mimetype='application/json')

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=PORT, debug=True)