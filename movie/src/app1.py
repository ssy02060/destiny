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
    # 입력된 파라미터가 없을 때
    if len(parameter_dict) == 0:
        return 'No parameter'
    else:
        keys = []
        values = []
        for key in parameter_dict.keys():
            # key : 영화코드, 개봉년도, 감독, 배우 등으로 검색
            # parameter 저장
            keys.append(key)
            values.append(parameter_dict[key])
            print(type(keys), file=sys.stderr)
            print(type(values), file=sys.stderr)
        if len(keys) == 1:
            if keys[0] == 'openYear':
                results = mydb.movieInfo.find({keys[0]:int(values[0])}, {"_id":0})
            else:
                results = mydb.movieInfo.find({keys[0]:{'$regex':values[0]}}, {"_id":0})
        elif len(keys) == 2:
            if 'openYear' in keys:
                if keys[0] == 'openYear':
                    results = mydb.movieInfo.find({{keys[0]:int(values[0])}, {keys[1]:values[1]}}, {"_id":0})
                results = mydb.movieInfo.find({{keys[0]:values[0]}, {keys[1]:int(values[1])}}, {"_id":0})
            results = mydb.movieInfo.find({{keys[0]:values[0]}, {keys[1]:values[1]}}, {"_id":0}) 
        # elif len(keys) == 3:
        dic = []
        for result in results:
            # 조건에 맞는 영화 목록 저장
            dic.append(result)
            print(dic, file=sys.stderr)
    # 리스트를 json 형식으로 변환하여 반환
    return jsonify(str(dic))

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
