import urllib.request as req
import json
from pymongo import MongoClient
# import DBHandler

def insert_item_one(mongo, data, db_name=None, collection_name=None):
    result = mongo[db_name][collection_name].insert_one(data).inserted_id
    return result

url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=bc4eb8b39d78ad29937cc1c9ed9604e0&itemPerPage={}&curPage={}'
itemPerPage = 100
page = 345
movieinfo = []
# host='DBHOST', port=27017
# client = DBHandler()
client = MongoClient(host='192.168.19.128', port=27017)
mydb = client['movie_data']
movie_data = mydb['movie_data']

while True:
    res = req.urlopen(url.format(itemPerPage, page))
    json_obj = json.load(res)
    a = []
    if json_obj['movieListResult']['totCnt'] < 1:
        break
    else:
        print("-------" + str(page) + "-----")
        for i in range(itemPerPage):
            a = json_obj['movieListResult']['movieList'][i]
            insert_item_one(mydb, a, 'movie', 'information')  
    page += 1
