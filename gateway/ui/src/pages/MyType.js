import React, { Component } from 'react';
import "../style/MyType.css"
import Movie_list from "../sample-data/movie_data"


class Movie extends Component {


    render() {
        console.log(this.props.rating)


        return (

            

                <div>
                    <img className='poster_Box ' src={this.props.poster} />
                </div>


            


        )
    }
}

const MyType =()=> {

        return (
            <div>
            <div className='Type_header'>
                
                <h1 className='Type_logo'>DESTINY</h1>
                <hr className='Type_hr' />
                <div className='type_info'>User님의 취향대로 영화들을 선택해주세요!
                    다양하네 선택할 수록 더 많은 영화를 추천 받을 수 있습니다.
                </div>
                </div>
                
                <div className='Type_layout'>
                    {Movie_list.map(movie => {
                        return <Movie poster={movie.poster}


                        />
                    })}
               
            </div>
            </div>


        )
    
}

export default MyType;