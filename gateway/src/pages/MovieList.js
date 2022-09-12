import React , {Component} from 'react';
import MovieItem from './MovieItem';
import Carousel from 'react-material-ui-carousel'
import styled from 'styled-components';
import Slider from "react-slick";
import { FcSettings } from 'react-icons/fc';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../style/Main.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
const MovieList = ({data,onOver}) => {
  
    
    return (
        <><StyledSlider {...settings} >
        
            
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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    
    // nextArrow: <SampleNextArrow />,
    //   prevArrow: <SamplePrevArrow />
  };
  const StyledSlider = styled(Slider)`
  width: 1300px;
  .slick-list {
    
    margin: 0 0;
  }

  .slick-slide div {
    /* cursor: pointer; */
  }

  .slick-dots {
    bottom: -100px;

    margin-top: 0px;
  }

  .slick-track {
    /* overflow-x: hidden; */
  }
  
`;


  
export default MovieList;