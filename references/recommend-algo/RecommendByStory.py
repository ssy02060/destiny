import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
import re

pd.set_option('max_colwidth', 100)

### countvectorizer -> 코사인 유사도 계산하여 나온 추천 영화
### 평점순으로 반환 

### 데이터 전처리 ###
### 현재 데이터베이스에 있는 데이터는 톰 크루즈, 레베카 퍼거슨, 사이먼 페그 식으로 저장되어있음
### 톰 크루즈, 레베카 퍼거슨, 사이먼 페그 <= 이게 하나의 문자열임 
### 이걸 ,를 공백으로 나눠주고 countvectorizer 실행
### countvectorizer를 실행한 데이터를 코사인 유사도 계산  

client = MongoClient(host='192.168.19.128', port=27017)
mydb = client['movie_data']

# mongodb에서 영화 data 불러오기
results = mydb.movieInfo.find()
dic = []
for result in results:
    dic.append(result)
# 불러온 mongodb의 영화 데이터를 데이터프레임으로 변환
df = pd.DataFrame(list(dic))
# 필요없는 필드 drop 처리
# df.drop(columns=['_id', 'openYear', 'movieCd', 'openDt', 'showTm', 'nationNm', 'watchGradeNm', 'rate'], inplace=True)
df.drop(columns=['_id', 'openYear', 'openDt', 'showTm', 'nationNm', 'watchGradeNm'], inplace=True)
# 데이터 전처리 
params = ['directors', 'actors', 'genre', 'story']
for i in range(1000):
    for p in params:
        # 끝마치는 문자 전처리
        df[p][i] = re.sub('[\?.\"!\'…]', ' ', df[p][i])
        # 중간에 있는 문자 전처리
        df[p][i] = re.sub('[+,#/:^$.@*※~&%ㆍ\‘\’\“\”|\(\)\[\]\<\>`]', '', df[p][i])

# CountVectorizer
count_vect = CountVectorizer(ngram_range=(1,3))
genre_mat = count_vect.fit_transform(df['genre'])
directors_mat = count_vect.fit_transform(df['directors'])
actors_mat = count_vect.fit_transform(df['actors'])
story_mat = count_vect.fit_transform(df['story'])

# similarity_genre = cosine_similarity(genre_mat, genre_mat).argsort()[:,::-1]
# print(similarity_genre)
similarity_story = cosine_similarity(story_mat, story_mat).argsort()[:,::-1]

# 영화 제목
def RecommendByMovieNm(df, movieNm, top=30):
    # 특정 영화정보 뽑아내기
    target_movie_index = df[df['movieNm'] ==  movieNm].index.values
    # 타겟영화와 비슷한 코사인유사도값
    sim_index = similarity_story[target_movie_index,:top].reshape(-1)
    # 본인제외
    sim_index = sim_index[sim_index != target_movie_index]
    # 추천결과 새로운 df 생성, 평점(rate)으로 정렬
    result = df.iloc[sim_index].sort_values('rate', ascending=False)
    return result

# # 영화 제목
# def RecommendByMovieNm(df, movieNm, top=30):
#     # 특정 영화정보 뽑아내기
#     target_movie_index = df[df['movieNm'] ==  movieNm].index.values
#     # 타겟영화와 비슷한 코사인유사도값
#     sim_index = similarity_genre[target_movie_index,:top].reshape(-1)
#     # 본인제외
#     sim_index = sim_index[sim_index != target_movie_index]
#     # 추천결과 새로운 df 생성, 평점(rate)으로 정렬
#     result = df.iloc[sim_index].sort_values('rate', ascending=False)
#     return result

# def RecommendByMovieCd(df, movieCd, top=30):
#     # 특정 영화정보 뽑아내기
#     target_movie_index = df[df['movieCd'] ==  movieCd].index.values
#     # 타겟영화와 비슷한 코사인유사도값
#     sim_index = similarity_genre[target_movie_index,:top].reshape(-1)
#     # 본인제외
#     sim_index = sim_index[sim_index != target_movie_index]
#     # 추천결과 새로운 df 생성, 평점(rate)으로 정렬
#     result = df.iloc[sim_index].sort_values('rate', ascending=False)
#     return result

# recommend = RecommendByMovieNm(df, movieNm='범죄도시2')
recommend = RecommendByMovieNm(df, movieNm='다만 악에서 구하소서')
print(recommend)
