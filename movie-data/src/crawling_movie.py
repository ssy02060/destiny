from bs4 import BeautifulSoup
import requests
import os
 
import threading
from multiprocessing import Process

from pymongo import MongoClient

client = MongoClient(host='192.168.19.128', port=27017)
mydb = client['movie_data']

vexpr = {
    "$jsonSchema": {
        "title": "movieInfo",
        "description": "movieInfo schema contains movieCd",
        "bsonType": "object",
        "required": ["movieCd"],
        "properties": {
            "movieCd": {
                "bsonType": "string",
            }
        }
    }
}
mydb.command({
    'collMod': "movieInfo",
    'validator': vexpr,
    'validationLevel': "moderate"
})
mydb.movieInfo.create_index(
    [('movieCd', 1)], name='movieCd', unique=True)

savePath = r'/home/joo/Documents/project/destiny/movie-data/movie_Information'

movieInfo = {
    'openYear': '',
    'movieCd': '',
    'movieNm': '',
    'openDt': '',
    'showTm': '',
    'nationNm': '',
    'directors': '',
    'actors': '',
    'watchGradeNm': '',
    'genre': '',
    'rate': '',
    'story': ''
}

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
 
 
def getMovieInfo(year_codes):
    global savePath
    year = year_codes[0]
    codes = year_codes[1]

    t = threading.Thread(target=getImage, args=(os.path.join(savePath, str(year)), codes))
    t.start()
 
    for i, code in enumerate(codes):
        #print(f'{i}/{len(codes)}', end='\r')
        url = f'https://movie.naver.com/movie/bi/mi/point.naver?code={code}'
        response = requests.get(url)

        movieInfo = {
            'openYear': '',
            'movieCd': '',
            'movieNm': '',
            'openDt': '',
            'showTm': '',
            'nationNm': '',
            'directors': '',
            'actors': '',
            'watchGradeNm': '',
            'genre': '',
            'rate': '',
            'story': ''
        }
 
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'lxml')
 
            title = soup.find('head').find('title').text.replace(' : 네이버 영화','')
            
            rate= getRate(soup.find_all('div','title_area grade_tit'))
 
            info_spec = soup.find('dl','info_spec')

            movieInfo['openYear'] = year
            print(movieInfo['openYear'])
            movieInfo['movieCd'] = code
            print(movieInfo['movieCd'])
            movieInfo['movieNm'] = title
            print(movieInfo['movieNm'])
 
            if info_spec is not None:
                info_spec = getInfoSpec(info_spec)

                movieInfo['genre'] = info_spec['장르']
                print(movieInfo['genre'])
                movieInfo['nationNm'] = info_spec['국가']
                print(movieInfo['nationNm'])
                movieInfo['showTm'] = info_spec['상영시간']
                print(movieInfo['showTm'])
                movieInfo['watchGradeNm']= info_spec['등급']
                print(movieInfo['watchGradeNm'])
                movieInfo['openDt'] = info_spec['개봉']
                print(movieInfo['openDt'])
                
                # 네티즌 평점
                if rate:
                    movieInfo['rate'] = rate
                    print(movieInfo['rate'])

                movieInfo['directors'] = info_spec['감독']
                print(movieInfo['directors'])
                movieInfo['actors'] = info_spec['출연']
                print(movieInfo['actors'])

 
            story = getStory(f'https://movie.naver.com/movie/bi/mi/basic.naver?code={code}')
            if story:
                movieInfo['story'] = story
                print(movieInfo['story'])
 
        else : 
            print(response.status_code)
        print("*"*15,i,"*"*15)
        print("*"*33)
        mydb.movieInfo.insert_one(movieInfo)
 
def getRate(htmls):
    rate = ''
    for html in htmls:
        if html.find('a', id='netizen_point_tab') is None:
            continue
        if html.find('a', id='netizen_point_tab').text == '네티즌 평점':
            for val in html.find('div', 'star_score').find_all('em'):
                rate += val.text
            if rate != '':
                return rate
    return False
 
def getStory(url):
    response = requests.get(url)
 
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'lxml')
        story = soup.find('p','con_tx')
        if story is not None:
            story = str(story).replace('<p class="con_tx">','').replace('</p>','').replace('\n','').replace('\t','')
            # <br/>뒤에 있는 공백은 ' '이 아니라 '\xa0'이다.
            # 공백이 html에서 &nbsp;로 표현되서 그렇나 봄?
            story = story.replace('<br/>','').replace('&lt;','<').replace('&gt;','>').replace('\r','').replace('\xa0','')
            return story
        return False       
    else : 
        print(response.status_code)
 
def getImage(path, codes):
    if not os.path.isdir(os.path.join(path)):
        os.makedirs(path)
    
    for code in codes:
        url = f'https://movie.naver.com/movie/bi/mi/photoViewPopup.naver?movieCode={code}'
        response = requests.get(url)
 
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'lxml')
            imgUrl = soup.find('img', id='targetImage')
            if imgUrl is not None:
                imgUrl = imgUrl.attrs['src']
                with open(os.path.join(path, code+'.png'), 'wb') as poster:
                    poster.write(requests.get(imgUrl).content)
        else:
            print(response.status_code)
 
def getInfoSpec(html):
    dtList = html.find_all('dt')
    ddList = html.find_all('dd')
 
    # 딕셔너리로 가져올 정보를 미리 정해 놓는다.
    info = {'장르':'',
            '상영시간':'',
            '국가':'',
            '개봉':'',
            '감독':'',
            '출연':'',
            '등급':''}
 
    # dt, dd의 개수만큽
    for dt, dd in zip(dtList, ddList):
        if '개요' in dt.text:
            for span in dd.find_all('span'):
                if '분' in span.text:
                    info['상영시간'] = span.text
                else:
                    for a in span.find_all('a'):
                        if 'genre' in str(a):
                            # 공연실황 제외 - 이건 뭐 하는건지?
                            # 멜로/로맨스 - 이상한 19금 영화가 엄청 많음, 어떻게 거를 방법이...
                            if '공연실황' in a.text:
                                continue
                            if info['장르'] != '':
                                info['장르'] += ', ' + a.text
                            else:
                                info['장르'] = a.text
                        # 국가도 여러개인 경우가 있네요
                        elif 'nation' in str(a):
                            if info['국가'] != '':
                                info['국가'] += ', ' + a.text
                            else:
                                info['국가'] = a.text
                        # 재개봉 영화의 경우 개봉이 여러개로 들어온다.
                        elif 'open' in str(a):
                            if info['개봉'] != '':
                                info['개봉'] += a.text
                            else:
                                info['개봉'] = a.text
        elif '감독' in dt.text:
            for a in dd.find_all('a'):
                # 감독이 여러명인 경우가 있어서 - 루소 형제 등?
                if info['감독'] != '':
                    info['감독'] += ', ' + a.text
                else:
                    info['감독'] = a.text
        elif '출연' in dt.text:
            for a in dd.find_all('a'):
                # 메인 출연진이 아니라면 pass
                if '더보기' in a.text:
                    continue
                if info['출연'] != '':
                    info['출연'] += ', ' + a.text
                else:
                    info['출연'] = a.text
        # 등급의 경우 한국 등급만 가져오려면 수정이 필요
        # 한국 등급이 없는 경우를 대비해서 일본, 미국 등의 등급이라도 가져오기 위해
        # 별다른 수정은 안 했습니다.
        elif '등급' in dt.text:
            for a in dd.find_all('a'):
                if 'grade' in str(a):
                    if info['등급'] != '':
                        info['등급'] += ', ' + a.text
                    else:
                        info['등급'] = a.text
    return info
 
 
def crawling(s, e):
    for i in range(s, e-1, -1):
        getMovieInfo(getMovieCodeByYear(i))
        # 역순으로 실행하게 for문 변경
 
if __name__ == "__main__":
    p1 = Process(target=crawling, args=(2023, 1990))
    # p2 = Process(target=crawling, args=(2011, 2001))
    # p3 = Process(target=crawling, args=(2000, 1990))
 
    p1.start()
    # p2.start()
    # p3.start()
