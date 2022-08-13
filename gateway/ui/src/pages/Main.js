import React, { Component } from 'react';
import "./Main.css";

class Main extends Component {
    render() {
        return (
             <div>
                <html>
                <font color = "ffffff" size = '6.5' style={{position : 'absolute', top : '250px', left:'46px'}}><b>박스 오피스 순위</b></font>
                {Movie_list.map(movie=>{
                        return <Movie MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}
                        
                        />
                    })}
                {Hi_list.map(movie=>{
                        return <Hi MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}
                        
                        />
                    })}
                {Hello_list.map(movie=>{
                        return <Hello MovieNm={movie.MovieNm} poster={movie.poster}
                        year={movie.year} view={movie.view}
                        
                        />
                    })}
                <font color = "ffffff" size = '6.5' style={{position : 'absolute', top : '640px', left:'46px'}}><b>평균 별점이 높은 작품</b></font>
                <font color = "ffffff" size = '6.5' style={{position : 'absolute', top : '1050px', left:'46px'}}><b>User님의 예상별점이 높은 작품</b></font>
                </html>
             </div>
        );
    }
}

const Movie_list = [
    {
        poster : "https://img.hankyung.com/photo/202206/PCM20220420000287005_P4.jpg",
        MovieNm : "한산 : 용의 출현",
        year : "2022 | 한국",
        view : "누적관객 : 266만명"
    },
    
    ];
    

    class Movie extends Component{
        render(){
            return(
              <li className='info_Box'>
                <div>
                    <img className='poster_Box ' src = {this.props.poster}/>
                </div>
                
                <dl className='poster_Box ' >
                    <h2 style={{position : 'absolute', top : '520px', left:'79px'}}>{this.props.MovieNm}</h2>
                    <h2 style={{position : 'absolute', top : '535px', left:'89px'}}>{this.props.year}</h2>
                    <h2 style={{position : 'absolute', top : '550px', left:'69px'}}>{this.props.view}</h2>
                 
                </dl>
            
                
                </li>
            
            )   
         }
    }

const Hi_list = [
    {
        poster : "https://an2-img.amz.wtchn.net/image/v2/7VosiYekMiFV-fdoVgpHUA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk5UVTRNREEwTWpZek5UVTROakUyTmpNaWZRLkFra0R4eTNjTEtEVVBMTVhPV1cwNm9EUGdIcG5KNmhPMVFIQVdvQnZmeWs",
        MovieNm : "미니언즈2",
        year : "2022 | 미국",
        view : "누적관객 : 160만명"
    },
    
    ];

    class Hi extends Component{
        render(){
            return(
              <li className='info_Box'>

                
                <div>
                    <img className='mini_Box ' src = {this.props.poster}/>
                </div>
                
                <dl className='mini_Box ' >
                    <h2 style={{position : 'absolute', top : '910px', left:'95px'}}>{this.props.MovieNm}</h2>
                    <h2 style={{position : 'absolute', top : '925px', left:'89px'}}>{this.props.year}</h2>
                    <h2 style={{position : 'absolute', top : '940px', left:'69px'}}>{this.props.view}</h2>
                 
                </dl>
                
                </li>
            
            )   
         }
    }



const Hello_list = [
    {
        poster : "https://an2-img.amz.wtchn.net/image/v2/GTwZ3A6d38XLNjvngCMLgg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmRxWTNObk5IVnVhbUUwZG5WNU1EQnJNMmcySW4wLjFmTkpDOUh6LXlsa3NWN1VqOFVYZmVPRFhYWXFwMG1JSHpPN1BKQXRIRG8",
        MovieNm : "코렐라인: 비밀의 문",
        year : "2009 | 미국",
        view : "누적관객 : 16만명"
    },
    
    ];

    class Hello extends Component{
        render(){
            return(
                <li className='info_Box'>

                
                <div>
                    <img className='Venice_Box ' src = {this.props.poster}/>
                </div>
                
                <dl className='Venice_Box ' >
                    <h2 style={{position : 'absolute', top : '1300px', left:'75px'}}>{this.props.MovieNm}</h2>
                    <h2 style={{position : 'absolute', top : '1315px', left:'94px'}}>{this.props.year}</h2>
                    <h2 style={{position : 'absolute', top : '1330px', left:'79px'}}>{this.props.view}</h2>
                    
                </dl>
                
                </li>
            
            )   
            }
    }
export default Main;