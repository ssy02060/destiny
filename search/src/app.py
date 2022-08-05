from pymongo import MongoClient
import boto3
import os
from flask import Flask

app = Flask("api_test")

PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']

post =  {
            "contents" : "범죄",
            "search" : { 
                "movieNm" : ["범죄도시", "범죄도시2"]
            }
        }

@app.route('/')
def hello():
    return 'search'


@ app.route('/create-collection')
def create_database():

    client = MongoClient(host=DBHOST, port = 27017)
    db = client['search']
    posts = db.search
    post_id = posts.insert_one(post).inserted_id

    return 'created'


if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)