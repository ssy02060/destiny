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

    # 년도 판별
    years = [str(i) for i in range(2023,1989, -1)]

    # 입력된 파라미터가 없을 때
    if len(parameter_dict) == 0:
        return 'No parameter'
    # 입력된 파라미터 1개
    elif len(parameter_dict) == 1:
        for key in parameter_dict.keys():
            # keyword로 전체 검색
            if key == 'keyword':
                # keyword로 년도 입력 됐을 때
                if parameter_dict[key] in years:
                    results = mydb.movieInfo.find({'openYear': int(parameter_dict[key])}, {"_id":0})
                # keyword로 그 외의 정보 입력 됐을 때
                else:
                    results = mydb.movieInfo.find(
                        {'$or':[
                            {'movieCd': parameter_dict[key]},
                            {'movieNm': {'$regex':parameter_dict[key]}},
                            {'openDt': parameter_dict[key]},
                            {'showTm': parameter_dict[key]},
                            {'nationNm': {'$regex':parameter_dict[key]}},
                            {'directors': {'$regex':parameter_dict[key]}},
                            {'actors': {'$regex':parameter_dict[key]}},
                            {'watchGradeNm': parameter_dict[key]},
                            {'genre': {'$regex':parameter_dict[key]}},
                            {'rate': parameter_dict[key]},
                            {'story': {'$regex':parameter_dict[key]}} 
                            ]}, {"_id":0})
            # key : 영화코드, 개봉년도, 감독, 배우 등으로 검색
            else:
                # openYear로 검색
                if parameter_dict[key] in years:
                    results = mydb.movieInfo.find({'openYear': int(parameter_dict[key])}, {"_id":0})
                # 그 외의 정보로 검색
                else:
                    results = mydb.movieInfo.find({key:{'$regex':parameter_dict[key]}}, {"_id":0})
            dic = []
        for result in results:
            # 조건에 맞는 영화 목록 저장
            dic.append(result)
            print(dic, file=sys.stderr)
        # 리스트를 json 형식으로 변환하여 반환
        return jsonify(str(dic))

    # 입력된 파라미터 2개
    elif len(parameter_dict) == 2:
        keys = []
        values = []
        # 파라미터로 openYear 전달됐는지 검증 변수
        global togle
        togle = 0
        for key in parameter_dict.keys():
            # 년도 입력 됐을 때 str -> int로 바꿔주기
            if key == 'openYear':
                keys.append(key)
                v = parameter_dict[key]
                values.append(int(v))
                togle = 1
            else:
                keys.append(key)
                values.append(parameter_dict[key])
        # 파라미터로 openYear 입력받음
        if togle == 1:
            if keys[0] == 'openYear':
                results = mydb.movieInfo.find(
                    {'$and':[
                        {keys[0]:values[0]},
                        {keys[1]:{'$regex':values[1]}}
                    ]}, {"_id":0})
                dic = []
                for result in results:
                    # 조건에 맞는 영화 목록 저장
                    dic.append(result)
                    print(dic, file=sys.stderr)
                # 리스트를 json 형식으로 변환하여 반환
                togle = 0
                return jsonify(str(dic))
            elif keys[1] == 'openYear':
                results = mydb.movieInfo.find(
                    {'$and':[
                        {keys[0]:{'$regex':values[0]}},
                        {keys[1]:values[1]}
                    ]}, {"_id":0})
                dic = []
                for result in results:
                    # 조건에 맞는 영화 목록 저장
                    dic.append(result)
                    print(dic, file=sys.stderr)
                # 리스트를 json 형식으로 변환하여 반환
                togle = 0
                return jsonify(str(dic))
        # 파라미터에 openYear가 없을 때
        else:
            results = mydb.movieInfo.find(
                {'$and':[
                    {keys[0]:{'$regex':values[0]}},
                    {keys[1]:{'$regex':values[1]}}
                ]}, {"_id":0})
            dic = []
            for result in results:
                # 조건에 맞는 영화 목록 저장
                dic.append(result)
                print(dic, file=sys.stderr)
            # 리스트를 json 형식으로 변환하여 반환
            return jsonify(str(dic))

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)