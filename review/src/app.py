from flask import Flask
from pymongo import MongoClient
import os
import datetime

post = {"author": "Mike",
        "text": "My first blog post!",
        "tags": ["mongodb", "python", "pymongo"],
        "date": datetime.datetime.utcnow()
        }

app = Flask("api_test")

PORT = os.environ['PORT']
DBHOST = os.environ['DBHOST']
'''
@app.get('/review')
def review_list():
    return 'Review'
'''    
def withUser(userid):
    client = MongoClient(host=DBHOST, port=27017)

    db = client['review']
    posts = db.review
    post_id = posts.insert_one(post).inserted_id

    return 'created'
#def withMoviCd(movieCd):

if __name__ == '__main__':
    app.run('0.0.0.0', port=PORT, debug=True)