import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <>
            <Link to="/" style={{position : 'fixed', top : '1px', left:'46px', display: 'flex'}}>
                <h1><font color = "FFDF65" bgcolor="000000" ><h1>DESTINY</h1></font></h1>
                
            </Link>
            <body bgcolor='000000'>  
                 <font color = "ffffff" size = '3' bgcolor="000000"  style={{position : 'fixed', top : '130px', left:'450px', display: 'flex'}}>평가하기</font>
                 <font color = "ffffff" size = '3' bgcolor="000000" style={{position : 'fixed', top : '130px', left:'650px', display: 'flex'}} >시스템 리뷰</font>
                    
             </body>
        </>
    );
}

export default Header;