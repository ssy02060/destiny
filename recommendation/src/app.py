from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import os
import sys
import pandas as pd
import requests, json
import re

app = Flask("Recommendation")

PORT = os.environ['PORT']
DB_PASSWORD = os.environ['DB_PASSWORD']
reader_endpoint = os.environ['READER_ENDPOINT']
writer_endpoint  = os.environ['WRITER_ENDPOINT']

@app.route('/')
def hello():
    res = requests.get('http://my-type/mytype/admin')
    text = res.text
    json_obj = json.loads(text)
    print(json_obj)
    return json_obj['movies']

@app.route('/recommendation')
def recommend():
    writer_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    reader_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + reader_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    mydb = reader_client['movie_data']

    res = requests.get('http://my-type/mytype/admin')
    text = res.text
    json_obj = json.loads(text)

    # parameter_dict = request.args.to_dict()
    # movieCd = []
    
    # for key in parameter_dict.keys():
    #     movieCd.append(parameter_dict[key])

    # movies = mydb.movieInfo.find({'movieCd': {'$in':movieCd}})
    movies = mydb.movieInfo.find({'movieCd': {'$in':json_obj['movies']}})
    d = []
    for movie in movies:
        d.append(movie)
    df1 = pd.DataFrame(list(d))
    print(df1)
    actors = []
    directors = []
    genre = []

    for i in range(len(df1)):
        for j in range(len(df1['actors'][i])):
            actors.append(df1['actors'][i][j])
        for j in range(len(df1['directors'][i])):
            directors.append(df1['directors'][i][j])
        for j in range(len(df1['genre'][i])):
            genre.append(df1['genre'][i][j])

    # # mongodb에서 영화 data 불러오기
    # results = mydb.movieInfo.find({'$nor':[{'movieCd':{'$in':movieCd}}],
    #                         '$and':[
    #                             {'actors': {'$in':actors}},
    #                             {'genre': {'$in':genre}}
    #                             ]})
    # mongodb에서 영화 data 불러오기
    results = mydb.movieInfo.find({'$nor':[{'movieCd':{'$in':json_obj['movies']}}],
                            '$and':[
                                {'actors': {'$in':actors}},
                                {'genre': {'$in':genre}}
                                ]})
    dic = []
    for result in results:
        dic.append(result)
    # 불러온 mongodb의 영화 데이터를 데이터프레임으로 변환
    df = pd.DataFrame(list(dic))
    print(df)
    params = ['directors', 'actors', 'genre', 'story']
    for i in range(len(df)):
        for p in params:
            # 끝마치는 문자 전처리
            # df[p][i] = re.sub('[\.\"\'…]', ' ', str(df[p][i]))
            # 중간에 있는 문자 전처리
            # df[p][i] = re.sub('[+,#/:^$.@*※~&%ㆍ\‘\’\“\”|\(\)\[\]\<\>`(&amp;ltg)]', '', str(df[p][i]))
            df[p][i] = re.sub('[,]', ' ', str(df[p][i]))
            df[p][i] = re.sub('[\[\]\'&amp;ltg]', '', str(df[p][i]))

    # 필요없는 필드 drop 처리
    df.drop(columns=['_id', 'openYear', 'openDt', 'showTm', 'nationNm', 'watchGradeNm'], inplace=True)
    temp = df.sort_values('rate', ascending=False)
    final_index = temp.index.values[ :15]
    result = df.iloc[final_index]

    result.reset_index(inplace=True)
    result.index = result.index+1
    result.drop(columns=['index'], inplace=True)

    return Response(result.to_html(), status=200)
    # return Response(result.to_html(), status=200, mimetype='application/json')
    # return Response(result, status=200, mimetype='application/json')

# @app.route('/recommendation/director')
# def recommend():
#     writer_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
#     reader_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + reader_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
#     mydb = reader_client['movie_data']

#     # response = requests.get('http://my-type/mytype')

#     parameter_dict = request.args.to_dict()
#     movieCd = []
    
#     for key in parameter_dict.keys():
#         movieCd.append(parameter_dict[key])

#     movies = mydb.movieInfo.find({'movieCd': {'$in':movieCd}})

#     d = []
#     for movie in movies:
#         d.append(movie)
#     df1 = pd.DataFrame(list(d))
#     print(df1)
#     actors = []
#     directors = []
#     genre = []

#     for i in range(len(df1)):
#         for j in range(len(df1['actors'][i])):
#             actors.append(df1['actors'][i][j])
#         for j in range(len(df1['directors'][i])):
#             directors.append(df1['directors'][i][j])
#         for j in range(len(df1['genre'][i])):
#             genre.append(df1['genre'][i][j])

#     # mongodb에서 영화 data 불러오기
#     results = mydb.movieInfo.find({'$nor':[{'movieCd':{'$in':movieCd}}],
#                             '$and':[
#                                 {'actors': {'$in':actors}},
#                                 {'directors': {'$in':directors}}
#                                 ]})
#     dic = []
#     for result in results:
#         dic.append(result)
#     # 불러온 mongodb의 영화 데이터를 데이터프레임으로 변환
#     df = pd.DataFrame(list(dic))
#     print(df)
#     params = ['directors', 'actors', 'genre', 'story']
#     for i in range(len(df)):
#         for p in params:
#             # 끝마치는 문자 전처리
#             # df[p][i] = re.sub('[\.\"\'…]', ' ', str(df[p][i]))
#             # 중간에 있는 문자 전처리
#             # df[p][i] = re.sub('[+,#/:^$.@*※~&%ㆍ\‘\’\“\”|\(\)\[\]\<\>`(&amp;ltg)]', '', str(df[p][i]))
#             df[p][i] = re.sub('[,]', ' ', str(df[p][i]))
#             df[p][i] = re.sub('[\[\]\'&amp;ltg]', '', str(df[p][i]))

#     # 필요없는 필드 drop 처리
#     df.drop(columns=['_id', 'openYear', 'openDt', 'showTm', 'nationNm', 'watchGradeNm'], inplace=True)
#     temp = df.sort_values('rate', ascending=False)
#     final_index = temp.index.values[ :15]
#     result = df.iloc[final_index]

#     result.reset_index(inplace=True)
#     result.index = result.index+1
#     result.drop(columns=['index'], inplace=True)

#     return Response(result.to_html(), status=200)
    # return Response(result.to_html(), status=200, mimetype='application/json')
    # return Response(result, status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)