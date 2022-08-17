import boto3
from PIL import Image

s3 = boto3.resource('s3')
def read_image_from_s3(filename):
    bucket = s3.Bucket(dstny.movie.poster)
    object = bucket.Object(filename)
    response = object.get()
    file_stream = response['Body']
    img = Image.open(file_stream)
    return img

read_image_from_s3('191139.png')