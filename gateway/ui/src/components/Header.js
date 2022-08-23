import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

function Header (){
    return (
        <div className='header'>
        
            <Link to="/" style={{position : 'fixed', top : '1px', left:'46px', display: 'flex'}}>
                <h1><font color = "FFDF65"><h1>DESTINY</h1></font></h1>
                
            </Link>
            <body >  
                 <font color = "ffffff" size = '5'  style={{position : 'fixed', top : '110px', left:'450px', display: 'flex'}}>평가하기</font>
                 <Link to="/review">
                 <font color = "ffffff" size = '5' style={{position : 'fixed', top : '110px', left:'650px', display: 'flex'}} >실시간 리뷰</font>
                 </Link>
             </body>
        
        </div>
        
       
    );
}


export default Header;