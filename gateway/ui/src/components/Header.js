import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { FcSearch } from "react-icons/fc";
import { useEffect, useState } from "react";
import searchicon from "../style/search_item.png"

function Header() {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        
        <div className='header'>

            <Link to="/" style={{ position: 'fixed', top: '0px', left: '100px', display: 'flex', textDecoration: "none" }}>
                <font color="FFDF65" size='5'><h1>DESTINY</h1></font>

            </Link>
            <body >
                <Link to="/rating">
                    <font color="ffffff" size='5' style={{ position: 'fixed', top: '50px', left: '450px', display: 'flex' }}>평가하기</font>
                </Link><Link to="/review">
                    <font color="ffffff" size='5' style={{ position: 'fixed', top: '50px', left: '650px', display: 'flex' }} >실시간 리뷰</font>
                </Link>
            </body>
           {/*  <div >

                <form style={{ position: 'fixed', top: '50px', left: '1000px', display: 'flex' }}>
                    <input type="text" value={search} onChange={onChange} />


                </form>

            </div>*/}



        </div>
     

    );
}


export default Header;

/*
<div >
            <form style={{position : 'fixed', top : '80px', left:'1100px', display: 'flex'}}>
              <input type='text' maxLength='20' className='search_input' name='search' placeholder='검색어를 입력해주세요.'/>
                <div>
                
                
                <img className='search_icon' src={searchicon}  />
              <input type='submit' value='검색' className='serach_submit'/>
              </div>
            </form>
        </div>
        *///<img className='search_icon' src={searchicon} />