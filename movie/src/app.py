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
        for key in parameter_dict.keys():
            # keyword로 전체 검색
            if key == 'keyword':
                results = mydb.movieInfo.find(
                    {'$or':[
                        {'openYear': parameter_dict[key]},
                        {'movieCd': parameter_dict[key]},
                        {'movieNm': parameter_dict[key]},
                        {'openDt': parameter_dict[key]},
                        {'showTm': parameter_dict[key]},
                        {'nationNm': parameter_dict[key]},
                        {'directors': parameter_dict[key]},
                        {'actors': {'$regex':parameter_dict[key]}},
                        {'watchGradeNm': parameter_dict[key]},
                        {'genre': {'$regex':parameter_dict[key]}},
                        {'rate': parameter_dict[key]},
                        {'story': parameter_dict[key]} 
                        ]}, {"_id":0})
            # key : 영화코드, 개봉년도, 감독, 배우 등으로 검색
            else:
                results = mydb.movieInfo.find({key:{'$regex':parameter_dict[key]}}, {"_id":0})
            dic = []
        for result in results:
            # 조건에 맞는 영화 목록 저장
            dic.append(result)
            print(dic, file=sys.stderr)
    # 리스트를 json 형식으로 변환하여 반환
    return jsonify(str(dic))

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
