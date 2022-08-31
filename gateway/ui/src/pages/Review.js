import React, { Component } from 'react';
import "../style/Review.css";
import Movie_list from "./movie_data"

import StarRatings from 'react-star-ratings';


class Movie extends Component {

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }
    render() {
        var rate = 0;
        rate = parseInt(this.props.rating)

        return (

            <li className='review_Box'>

                <div>
                    <img className='poster_Box ' src={this.props.poster} />
                </div>

                <div className='info' >
                    <h3 className='MovieNm' >{this.props.MovieNm}</h3>
                    <h3 className='year'>{this.props.year}</h3>
                    <StarRatings

                        rating={rate}
                        starDimension="40px"
                        starSpacing="5px"


                    />

                    <h3 className='userid'>작성자 : {this.props.userid}</h3>
                    <h1 className='comment'>{this.props.comment}</h1>
                </div>

            </li>


        )
    }
}




class Review extends Component {
    render() {
        return (
            <div className='layout_Box'>
                {Movie_list.map(movie => {
                    return <Movie MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} rating={movie.rating} userid={movie.userid}
                        comment={movie.comment}

                    />
                })}
            </div>

        );
    }
}







export default Review;



//https://codingzzangmimi.tistory.com/38
//https://www.npmjs.com/package/react-star-ratings