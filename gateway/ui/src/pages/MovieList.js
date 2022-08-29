import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({data,onOver}) => {
    console.log(data[0])
    return (
        <>
            
                    {/* Movies.js에서 받은 데이터를 map으로 반복문 돌림 */}
                    {/* 그리고 item을 MovieItem.js로 념겨줌 */}
                        {
                            data.map(item=><MovieItem key={item.rank} 
                                item={item} onOver={onOver}/>)
                        }
                        </>
    );
};

export default MovieList;