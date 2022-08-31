import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import "../style/Main.css";
// MovieList.js에서 넘어온 item을 받아줌
const MovieItem = ({item,onOver}) => {

    const {rank,poster,MovieNm, year} = item

    return (
       
        <>
      

        <li className='movie_Box' onClick={()=>onOver(rank)}>
        <img className='poster_Box ' src={poster}  alt={MovieNm}/>
        <dl className='info_Box ' >
                    <h3 >{MovieNm}</h3>
                    <h3>{year}</h3>
                    

                </dl>

            
        </li>
        
       
        </>
    );
};

export default MovieItem;