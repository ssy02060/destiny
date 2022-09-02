import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import "../style/Main.css";
// MovieList.js에서 넘어온 item을 받아줌
const MovieItem = ({item,onOver}) => {

    const { imageUrl, movieNm, movieCd, openDt,nationNm, rate } = item

    return (
       
        <>
      

        <li className='movie_Box' onClick={()=>onOver(movieCd)}>
        <img className='poster_Box ' src={imageUrl}  alt={movieNm}/>
        <dl className='info_Box ' >
                    <h3 >{movieNm}</h3>
                    <h3>{openDt}</h3>
                    

                </dl>

            
        </li>
        
       
        </>
    );
};

export default MovieItem;