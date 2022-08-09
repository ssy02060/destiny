from flask import Flask, request, jsonify
from pymongo import MongoClient
import os


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
                # r['openYear'] = result['openYear']
                # r['movieCd'] = result['movieCd']
                # r['movieNm'] = result['movieNm']
                # r['openDt'] = result['openDt']
                # r['showTm'] = result['showTm']
                # r['nationNm'] = result['nationNm']
                # r['directors'] = result['directors']
                # r['actors'] = result['actors']
                # r['watchGradeNm'] = result['watchGradeNm']
                # r['genre'] = result['genre']
                # r['rate'] = result['rate']
                # r['story'] = result['story']
            # dic=[]
                dic.append(str(result['openYear']))
                dic.append(result['movieCd'])
                dic.append(result['movieNm'])
                dic.append(result['openDt'])
                dic.append(result['showTm'])
                dic.append(result['nationNm'])
                dic.append(result['directors'])
                dic.append(result['actors'])
                dic.append(result['watchGradeNm'])
                dic.append(result['genre'])
                dic.append(result['rate'])
                dic.append(result['story'])
                # r.append(result)
    return jsonify(dic)

# def read_review():
#     print(type(request.args.get('userId')),file=sys.stderr)
#     a = request.args.get('userId')
#     print(type(a),file=sys.stderr)
#     if request.method == 'GET':
#         parameter_dict = request.args.to_dict()
#         print(parameter_dict, file=sys.stderr)
#         print(len(parameter_dict), file=sys.stderr)
#         if len(parameter_dict) == 0:
#             review_list = []
#             for review in reviews.find():
#                 review_list.append(review)
#             return str(review_list)
#         else:
#             parameters = ''
#             parameter_dict = request.args.to_dict()
#             for key in parameter_dict.keys():
#                 parameters += 'key: {}, value: {}\n'.format(key, request.args[key])
#             print(key, file=sys.stderr)
#             if key == "userId":
#                 review_list = []
#                 for review in reviews.find({"userId":request.args.get('userId')}):
#                     review_list.append(review)
#                 return str(review_list)     # 향후 수정
#             elif key == "movieCd":
#                 review_list = []
#                 for review in reviews.find({"movieCd":request.args.get('movieCd')}):
#                     review_list.append(review)
#                 return str(review_list)     # 향후 수정

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
