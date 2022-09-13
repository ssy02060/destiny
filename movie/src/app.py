from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import os
import sys

app = Flask("Movie")

PORT = os.environ['PORT']
DB_PASSWORD = os.environ['DB_PASSWORD']
writer_endpoint = os.environ['WRITER_ENDPOINT']
reader_endpoint = os.environ['READER_ENDPOINT']


# mydb = writer_client['movie_data']


@app.route('/')
def root():
    return 'Movie API'

@app.route('/movie/poster',methods=['GET'])
# 파라미터로 movieCd 넘겨주면 포스터 출력
def view_poster():
    writer_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    reader_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + reader_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    mydb = reader_client['movie_data']
    
    parameter_dict = request.args.to_dict()

    # 입력된 파라미터가 없을 때
    if len(parameter_dict) == 0:
        return Response("검색어를 입력하세요.", status=404, mimetype='application/json')
    # 입력된 파라미터 1개
    elif len(parameter_dict) == 1:
        for key in parameter_dict.keys():
            results = mydb.movieInfo.find({'movieCd': parameter_dict[key]}, {"_id":0})
            imgUrl = []
            for result in results:
                if result['imgeUrl'] is not None:
                    imgUrl.append(result['imageUrl'])
                else:
                    return Response("영화 포스터가 존재하지 않습니다. 다른 영화를 검색해주세요.", status=404, mimetype='application/json')
        return Response(str(imgUrl), status=200, mimetype='application/json')

@app.route('/movie',methods=['GET'])
def find_movie():
    writer_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    reader_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + reader_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    mydb = reader_client['movie_data']
    parameter_dict = request.args.to_dict()

    # 년도 판별
    years = [str(i) for i in range(2023,1989, -1)]
    parameters = ['keyword', 'openYear', 'movieCd', 'movieNm', 'openDt', 'showTm', 'nationNm', 'directors', 'actors', 'watchGradeNm', 'genre', 'rate', 'story']

    # 입력된 파라미터가 없을 때
    if len(parameter_dict) == 0:
        return Response("검색어를 입력하세요.", status=404, mimetype='application/json')
    # 입력된 파라미터 1개
    elif len(parameter_dict) == 1:
        for key in parameter_dict.keys():
            # 검색어 판별
            if key in parameters:
                # 검색어로 keyword 입력 : 전체검색
                if key == 'keyword':
                    # keyword로 전달된 파라미터 값이 년도로 입력 됐을 때
                    if parameter_dict[key] in years:
                        results = mydb.movieInfo.find({'openYear': int(parameter_dict[key])}, {"_id":0})
                        dic = []
                        for result in results:
                            # 조건에 맞는 영화 목록 저장
                            dic.append(result)
                            print(dic, file=sys.stderr)
                        # 검색된 영화 리스트를 반환
                        return Response(str(dic), status=200, mimetype='application/json')
                    # keyword로 그 외의 정보 입력 됐을 때 : 요소별 검색
                    elif parameter_dict[key] not in years:
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
                        dic = []
                        for result in results:
                            # 조건에 맞는 영화 목록 저장
                            dic.append(result)
                            print(dic, file=sys.stderr)
                        # 조건에 맞는 영화 목록 없음
                        if not dic:
                            return Response("입력하신 검색어와 일치하는 영화가 없습니다. 다시 검색해주세요.", status=404, mimetype='application/json')
                        # 검색된 영화 리스트를 반환
                        return Response(str(dic), status=200, mimetype='application/json')
                # key : 영화코드, 개봉년도, 감독, 배우 등으로 검색
                else:
                    # 검색어로 openYear 입력 : 개봉년도 검색
                    if key == 'openYear':
                        results = mydb.movieInfo.find({'openYear': int(parameter_dict[key])}, {"_id":0})
                    # 그 외의 정보로 검색
                    else:
                        results = mydb.movieInfo.find({key:{'$regex':parameter_dict[key]}}, {"_id":0})
                    dic = []
                    for result in results:
                        # 조건에 맞는 영화 목록 저장
                        dic.append(result)
                        print(dic, file=sys.stderr)
                    # 조건에 맞는 영화 목록 없음
                    if not dic:
                        return Response("입력하신 검색어와 일치하는 영화가 없습니다. 다시 검색해주세요.", status=404, mimetype='application/json')
                    # 검색된 영화 리스트를 반환
                    return Response(str(dic), status=200, mimetype='application/json')
            else:
                return Response("입력하신 키워드가 잘못 입력됐습니다. 확인하여 다시 검색해주세요.", status=404, mimetype='application/json')

    # 입력된 파라미터 2개
    elif len(parameter_dict) == 2:
        keys = []
        values = []
        # 파라미터로 openYear 전달됐는지 검증 변수
        togle = 0
        for key in parameter_dict.keys():
            if key in parameters:
                # 년도 입력 됐을 때 str -> int로 바꿔주기
                if key == 'openYear':
                    keys.append(key)
                    v = parameter_dict[key]
                    values.append(int(v))
                    togle = 1
                else:
                    keys.append(key)
                    values.append(parameter_dict[key])
            else:
                return Response("입력하신 키워드가 잘못 입력됐습니다. 확인하여 다시 검색해주세요.", status=404, mimetype='application/json')
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
                # 검색된 영화 리스트를 반환
                togle = 0
                # 조건에 맞는 영화 목록 없음
                if not dic:
                    return Response("입력하신 검색어와 일치하는 영화가 없습니다. 다시 검색해주세요.", status=404, mimetype='application/json')
                return Response(str(dic), status=200, mimetype='application/json')
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
                # 검색된 영화 리스트를 반환
                togle = 0
                # 조건에 맞는 영화 목록 없음
                if not dic:
                    return Response("입력하신 검색어와 일치하는 영화가 없습니다. 다시 검색해주세요.", status=404, mimetype='application/json')
                return Response(str(dic), status=200, mimetype='application/json')
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
            # 조건에 맞는 영화 목록 없음
            if not dic:
                return Response("입력하신 검색어와 일치하는 영화가 없습니다. 다시 검색해주세요.", status=404, mimetype='application/json')
            # 검색된 영화 리스트를 반환
            return Response(str(dic), status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)