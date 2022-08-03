from flask import Flask
from gridfs import Database
from pymongo import MongoClient
import os
import datetime
import pprint
post = {"id": "Mike",
        "email": "My first blog post!",
        "tags": ["mongodb", "python", "pymongo"],
        "date": datetime.datetime.utcnow()
        }

app = Flask("api_test")

PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']


@ app.route('/')
def hello():
    return 'python-web'


post_id = ''


@ app.route('/create-collection')
def create_database():
    client = MongoClient(host=DBHOST, port=27017)
    # 각자 서비스명

    db = client['movie-data']
    movie_data = db['movie_data']
    post_id = movie_data.insert_one(post).inserted_id

    print(post_id)

    return 'inserted'


@ app.route('/query')
def query():
    client = MongoClient(host=DBHOST, port=27017)
    # 각자 서비스명

    db = client['python-web']
    posts = db.posts
    pprint.pprint(posts.find_one({"_id": post_id}))

    item = posts.find_one({"_id": post_id})

    print(post_id)

    return 'item' + post_id


if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)
