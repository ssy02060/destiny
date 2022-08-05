import urllib.request as req
import json
from pymongo import MongoClient

def insert_item_one(mongo, data, db_name=None, collection_name=None):
    result = mongo[db_name][collection_name].insert_one(data).inserted_id
    return result


url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=23de43127e4d24b1bbd3016f89547a1b&movieCd={}'

client = MongoClient(host='192.168.19.128', port=27017)
mydb = client['movie_data']
movieCd = []
data = {
    'author' : 'jun'
}
# mydb.movie.details.insert_one(data)

for d in mydb['movie.information'].find():
    a = d['movieCd']
    movieCd.append(a)

for i in movieCd:
    res = req.urlopen(url.format(i))
    json_obj = json.load(res)
    b = json_obj['movieInfoResult']['movieInfo']
    mydb.movie.details.insert_one(b)
    # insert_item_one(mydb, a, 'movie', 'details')
    print(b)


# while True:
#     res = req.urlopen(url.format(movieCd))
#     json_obj = json.load(res)
#     for i in range(len(movieCd)):
#             a = json_obj['movieInfoResult']['movieInfo']
#             insert_item_one(mydb, a, 'movie', 'details')