from PIL import Image
import boto3
import os

AWS_ACCESS_KEY = os.environ['AWS_ACCESS_KEY']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
REGION = os.environ['REGION']

def s3_session():
    try:
        session = boto3.Session(
            region_name=REGION,
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return session

# def s3_put_object(s3, bucket, filepath, access_key):
#     """
#     s3 bucket에 지정 파일 업로드
#     :param s3: 연결된 s3 객체(boto3 client)
#     :param bucket: 버킷명
#     :param filepath: 파일 위치
#     :param access_key: 저장 파일명
#     :return: 성공 시 True, 실패 시 False 반환
#     """
#     try:
#         s3.upload_file("{로컬에서 올릴 파일이름}","{버킷 이름}","{버킷에 저장될 파일 이름}")
#     except Exception as e:
#         print(e)

s3 = s3_session().resource('s3')
def read_image_from_s3(filename):
    bucket = s3.Bucket("dstny.movie.poster")
    object = bucket.Object(filename)
    response = object.get()
    file_stream = response['Body']

    img = Image.open(file_stream)
    return img

print(read_image_from_s3('191139.png'))