import React, { Component } from 'react';
import "./Main.css";
import Header from '../components/Header';
import Movie_list from "./movie_data"

class Main extends Component {
    render() {
        return (
            
            <div className='movie_List_Box'>
                <h2 className='font' ><b>박스 오피스 순위</b></h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Movie_list.map(movie => {
                    return <Movie MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}

                    />
                })}
               
               </div>  


                    <h2 className='font' ><b>평균 별점이 높은 작품</b></h2>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Movie_list.map(movie => {
                    return <Movie MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}

                    />
                })}
               
               </div>  
                    <h2 className='font' ><b>User님의 예상별점이 높은 작품</b></h2>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Movie_list.map(movie => {
                    return <Movie MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}

                    />
                })}
               
               </div>  
               
            
            </div>
        );
    }
}


class Movie extends Component {
    render() {
        return (

            <li className='movie_Box'>
                <div>
                    <img className='poster_Box ' src={this.props.poster} />
                </div>

                <dl className='info_Box ' >
                    <h3>{this.props.MovieNm}</h3>
                    <h3>{this.props.year}</h3>
                    <h3>{this.props.view}</h3>

                </dl>


            </li>

        )
    }
}

export default Main;