import React, { useState } from 'react';
import movie from '../sample-data/movie.json' //json형식 데이터를 불러올때는 풀네임 적어줘야 함
import MovieList from './MovieList';
import Modal from './Modal';

const Main = () => {

    const [data, setData] = useState(movie)
    const [movieInfo, setMovieInfo] = useState(data[0])

    const [isShow, setIsShow] = useState(false)

    const onOver = (id) => {
        const num = data.findIndex(item => item.movieCd === id)
        setMovieInfo(data[num])
        //setMovieInfo(data.find(item=>item.rank===id))   
        setIsShow(true)
    }

    //open은 view한테 보낸다
    const onOpen = () => {
        setIsShow(true)
    }

    //close는 modal한테 보낸다.
    const onClose = () => {
        setIsShow(false)
    }

    return (
        <>  
            <div>
                <div className='movie_List_Box'>
                    <h2 className='font' ><b>박스 오피스 순위</b></h2>
                  
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <MovieList data={data} onOver={onOver} />
                    </div>
                   
                </div>
            </div>
            
            <div>
                <div className='movie_List_Box'>
                    <h2 className='font' ><b>평균 별점이 높은 작품</b></h2>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <MovieList data={data} onOver={onOver} />
                    </div>
                </div>
            </div>
            <div>
                <div className='movie_List_Box'>
                    <h2 className='font' ><b>User님의 예상별점이 높은 작품</b></h2>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <MovieList data={data} onOver={onOver} />
                    </div>
                </div>
            </div>
            {/* isShow가 true일 때만 보여라 */}
            {
                isShow && <Modal onClose={onClose} movieInfo={movieInfo} />
            }
        </>
    );
};

export default Main;