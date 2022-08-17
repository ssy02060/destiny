from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient

client = MongoClient(host='192.168.19.128', port=27017)
mydb = client['movie_data']
 

def getMovieCodeByYear(year):
    movieCode = []
 
    url = f'https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open={year}&page=10000'
 
    response = requests.get(url)
 
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'lxml')
        
        # html에서 div 태그 중 class이름이 pagenavigation 태그를 찾아라
        pagenavigation = soup.find('div','pagenavigation')
        # pagenavigation내 <a> 태그 중 마지막 태그의 text 값
        lastPage = pagenavigation.find_all('a')[-1].text
 
        for i in range(1, int(lastPage)+1):
            url = f'https://movie.naver.com/movie/sdb/browsing/bmovie.naver?open={year}&page={i}'
            response2 = requests.get(url)
 
            if response2.status_code == 200:
                html = response2.text
                soup = BeautifulSoup(html, 'lxml')
                
                # html에서 ul 태그 중 class이름이 directory_list 태그를 찾아라
                directory_list = soup.find('ul','directory_list')
                allA = directory_list.findAll('a')
                for a in allA:
                    if '?code=' in str(a):
                        movieCode.append(str(a).split('?code=')[1].split('"')[0])
            else : 
                print(response2.status_code)
    else : 
        print(response.status_code)
        
    return year, movieCode
 
 
def getMoviePoster(year_codes):
    codes = year_codes[1]
    
    getImage(codes)

def getImage(codes):
    for code in codes:
        url = f'https://movie.naver.com/movie/bi/mi/photoViewPopup.naver?movieCode={code}'
        response = requests.get(url)
    
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'lxml')
            imgUrl = soup.find('img', id='targetImage')
            if imgUrl is not None:
                imgUrl = imgUrl.attrs['src']
                mydb.movieInfo.update_one({'movieCd': code}, {'$set':{"imgUrl": imgUrl}})
                print(imgUrl)
        else:
            print(response.status_code)
 
def crawling(s, e):
    for i in range(s, e-1,-1):
        getMoviePoster(getMovieCodeByYear(i))
 
if __name__ == "__main__":
    crawling(2022,1990)