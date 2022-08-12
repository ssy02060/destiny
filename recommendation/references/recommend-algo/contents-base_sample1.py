# https://romg2.github.io/mlguide/01_%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-%EC%99%84%EB%B2%BD%EA%B0%80%EC%9D%B4%EB%93%9C-09.-%EC%B6%94%EC%B2%9C%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%BD%98%ED%85%90%EC%B8%A0-%EA%B8%B0%EB%B0%98/
# 추천 시스템 [컨텐츠 기반]
# pip insatll numpy, pandas, matplotlib, seaborn
import numpy as np
import pandas as pd

import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns

import warnings
# %matplotlib inline
# %config InlineBackend.figure_format = 'retina'

mpl.rc('font', family='NanumGothic') # 폰트 설정
mpl.rc('axes', unicode_minus=False) # 유니코드에서 음수 부호 설정

# 차트 스타일 설정
sns.set(font="NanumGothic", rc={"axes.unicode_minus":False}, style='darkgrid')
plt.rc("figure", figsize=(10,8))

warnings.filterwarnings("ignore")

movies = pd.read_csv("/home/joo/Documents/project/destiny/recommendation/references/recommend-algo/tmdb_5000_movies.csv")

# 주요 컬럼으로 데이터 프레임 생성
col_lst = ['id', 'title', 'genres', 'vote_average', 'vote_count', 'popularity', 'keywords', 'overview']
movies_df = movies[col_lst]

# 컬럼 길이 늘려서 출력
pd.set_option('max_colwidth', 80)
movies_df[['genres','keywords']][:1]

# 옵션 초기화
pd.reset_option("max_colwidth")

from ast import literal_eval

# 문자열을 객체로 변경: 리스트 내의 사전
movies_df['genres'] = movies_df['genres'].apply(literal_eval)
movies_df['keywords'] = movies_df['keywords'].apply(literal_eval)

# 객체에서 name만 추출: 사전 마다 name을 추출
movies_df['genres'] = movies_df['genres'].apply(lambda x : [ dic['name'] for dic in x] )
movies_df['keywords'] = movies_df['keywords'].apply(lambda x : [ dic['name'] for dic in x] )

movies_df[['genres', 'keywords']][:1]


from sklearn.feature_extraction.text import CountVectorizer

# 리스트 객체를 문자열로 변환: 공백으로 구분
movies_df['genres_literal'] = movies_df['genres'].apply(lambda x : (' ').join(x))

# CountVectorizer
count_vect = CountVectorizer(min_df=0, ngram_range=(1,2))
genre_mat = count_vect.fit_transform(movies_df['genres_literal'])

print(genre_mat.shape)

from sklearn.metrics.pairwise import cosine_similarity

genre_sim = cosine_similarity(genre_mat, genre_mat)

def find_sim_movie(df, sim_matrix, title_name, top_n=10):
    
    # 입력한 영화의 index
    title_movie = df[df['title'] == title_name]
    title_index = title_movie.index.values
    
    # 입력한 영화의 유사도 데이터 프레임 추가
    df["similarity"] = sim_matrix[title_index, :].reshape(-1,1)
    
    # 유사도 내림차순 정렬 후 상위 index 추출
    temp = df.sort_values(by="similarity", ascending=False)
    final_index = temp.index.values[ : top_n]
    
    return df.iloc[final_index]

# The Godfather(대부)와 장르별 유사도가 높은 영화 10개
similar_movies = find_sim_movie(movies_df, genre_sim, 'The Godfather', 10)
similar_movies[['title', 'vote_average', "similarity"]]

movies_df[['title','vote_average','vote_count']].sort_values('vote_average', ascending=False)[:10]

percentile = 0.6
m = movies_df['vote_count'].quantile(percentile)
C = movies_df['vote_average'].mean()

def weighted_vote_average(record):
    v = record['vote_count']
    R = record['vote_average']
    
    return ( (v/(v+m)) * R ) + ( (m/(m+v)) * C )   

movies_df['weighted_vote'] = movies_df.apply(weighted_vote_average, axis=1)

temp = movies_df[['title','vote_average','vote_count','weighted_vote']]
temp.sort_values('weighted_vote', ascending=False)[:10]

def find_sim_movie(df, sim_matrix, title_name, top_n=10):
    
    # 입력한 영화의 index
    title_movie = df[df['title'] == title_name]
    title_index = title_movie.index.values
    
    # 입력한 영화의 유사도 데이터 프레임 추가
    df["similarity"] = sim_matrix[title_index, :].reshape(-1,1)
        
    # 유사도와 가중 평점순으로 높은 상위 index 추출 (자기 자신 제거)
    temp = df.sort_values(by=["similarity", "weighted_vote"], ascending=False)
    temp = temp[temp.index.values != title_index]
    
    final_index = temp.index.values[:top_n]
    
    return df.iloc[final_index]

similar_movies = find_sim_movie(movies_df, genre_sim, 'The Godfather', 10)
similar_movies[['title', 'vote_average', "weighted_vote", "similarity"]]
print(similar_movies)