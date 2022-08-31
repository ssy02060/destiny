import React , {Component} from 'react';
import MovieItem from './MovieItem';
import Carousel from 'react-material-ui-carousel'
import styled from 'styled-components';
import Slider from "react-slick";
import { FcSettings } from 'react-icons/fc';

const MovieList = ({data,onOver}) => {
  
    
    return (
        <><StyledSlider {...settings} className='movie_List_Box'>
        
            
                    {/* Movies.js에서 받은 데이터를 map으로 반복문 돌림 */}
                    {/* 그리고 item을 MovieItem.js로 념겨줌 */}
                        {
                            data.map(item=><MovieItem key={item.rank} 
                                item={item} onOver={onOver}/>)
                        } 
                        
                        
                        </StyledSlider>
                        </>
                        
                        
    );
    
};
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };
  const StyledSlider = styled(Slider)`
  .slick-list {
    
    margin: 0 auto;
  }

  .slick-slide div {
    /* cursor: pointer; */
  }

  .slick-dots {
    bottom: -50px;
    margin-top: 200px;
  }

  .slick-track {
    /* overflow-x: hidden; */
  }
`;
export default MovieList;