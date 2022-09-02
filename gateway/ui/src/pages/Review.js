import React, { Component } from 'react';
import "../style/Review.css";
import Movie_list from "../sample-data/movie"

import StarRatings from 'react-star-ratings';


class ReviewMovie extends Component {

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }
    render() {
        var rates = 0;
        rates = parseFloat(this.props.rate)

        return (

            <li className='review_Box'>

                <div>
                    <img className='poster_Box ' src={this.props.imageUrl} />
                </div>

                <div className='info' >
                    <h3 className='MovieNm' >{this.props.movieNm}</h3>
                    <h3 className='year'>{this.props.openDt}</h3>
                    <StarRatings

                        rating={rates}
                        starDimension="40px"
                        starSpacing="5px"

                    />

                    <h3 className='userid'>작성자 : {this.props.id}</h3>
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
                    return <ReviewMovie movieNm={movie.movieNm} imageUrl={movie.imageUrl}
                        openDt={movie.openDt} rate={movie.rate} id={movie.id}
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