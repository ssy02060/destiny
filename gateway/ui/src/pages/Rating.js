import React, { useState } from 'react';
import './style.css';
import "../style/Review.css";
import movie from './movie_data2.json' //json형식 데이터를 불러올때는 풀네임 적어줘야 함

import MovieList from './MovieList';
import Modal from './Modal';

const Rating= () => {

    const [data,setData] = useState(movie)
    const [movieInfo,setMovieInfo] = useState(data[0])

    const [isShow,setIsShow] = useState(false)

    const onOver = (id) => {
        const num = data.findIndex(item=>item.rank===id)
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
        <div className='rating_layout_Box'>
        

       
       
            <MovieList data={data} onOver={onOver}/>
        
        </div>
        </div>
        {/* isShow가 true일 때만 보여라 */}
        {
            isShow && <Modal onClose={onClose} movieInfo={movieInfo}/>
        }
        </>
    );
};

export default Rating;