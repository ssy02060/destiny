from flask import Flask, request, jsonify, Response
from pymongo import MongoClient
import os
import sys
import pandas as pd

app = Flask("Recommendation")

PORT = os.environ['PORT']
DB_PASSWORD = os.environ['DB_PASSWORD']
reader_endpoint = 'destiny.cluster-ro-cvj4baspdxd6.ap-northeast-2.docdb.amazonaws.com'
writer_endpoint  = 'destiny.cluster-cvj4baspdxd6.ap-northeast-2.docdb.amazonaws.com'

@app.route('/')
def hello():
    return 'recommendation'

@app.route('/recommendation')
def recommend():
    writer_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + writer_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    reader_client = MongoClient('mongodb://root:'+ DB_PASSWORD + '@' + reader_endpoint + ':27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', maxPoolSize=200)
    mydb = reader_client['movie_data']
    
    parameter_dict = request.args.to_dict()
    movieCd = []
    for key in parameter_dict.keys():
        movieCd.append(parameter_dict[key])
    
    movies = mydb.movieInfo.find({'movieCd': {'$in':movieCd}})

    d = []
    for movie in movies:
        d.append(movie)
    df1 = pd.DataFrame(list(d))
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

    # mongodb에서 영화 data 불러오기
    results = mydb.movieInfo.find({'$nor':[{'movieNm':{'$in':Nm}}],
                            '$and':[
                                {'actors': {'$in':actors}},
                                # {'directors': {'$in':directors}}
                                {'genre': {'$in':genre}}
                                ]})
    dic = []
    for result in results:
        dic.append(result)
    # 불러온 mongodb의 영화 데이터를 데이터프레임으로 변환
    df = pd.DataFrame(list(dic))
    # 필요없는 필드 drop 처리
    df.drop(columns=['_id', 'openYear', 'openDt', 'showTm', 'nationNm', 'watchGradeNm'], inplace=True)
    temp = df.sort_values('rate', ascending=False)
    final_index = temp.index.values[ :15]
    result = df.iloc[final_index]

    return Response(result, status=200, mimetype='application/json')


@app.route('/genreNm')
def genre_recommend():
    return 'genre_recommend'

@app.route('/directors')
def directors_recommend():
    return 'directors_recommend'

@app.route('/actors')
def actors_recommend():
    return 'actors_recommend'

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)