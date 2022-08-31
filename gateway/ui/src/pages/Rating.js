import React, { useState } from 'react';
import '../style/Modal.css';
import "../style/Review.css";
import movie from '../data/movie.json' //json형식 데이터를 불러올때는 풀네임 적어줘야 함
import MovieItem from './MovieItem';
import MovieList from './MovieList';
import Rating_Modal from './RatingModal.js';

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
        

       
       
            {/* <MovieList data={data} onOver={onOver}/> */}
            {
                            data.map(data=><RatingMovieItem 
                                item={data} onOver={onOver}/>)
                        } 
           
        </div>
        </div>
        {/* isShow가 true일 때만 보여라 */}
        {
            isShow && <Rating_Modal onClose={onClose} movieInfo={movieInfo}/>
        }
        </>
    );
};
const RatingMovieItem = ({item,onOver}) => {

    const {rank,poster,MovieNm, year} = item

    return (
       
        <>
      

        <li onClick={()=>onOver(rank)}>
        <img className='poster_Box ' src={poster}  alt={MovieNm}/>
        <dl className='info_Box ' >
                  
                    

                </dl>

            
        </li>
        
       
        </>
    );
};
export default Rating;