import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

import { useEffect, useState } from "react";

function Header() {
    const [search, setSearch] = useState("");
    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }


    return (

        <div className='header'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <Link to="/" style={{ position: 'fixed', top: '0px', left: '100px', display: 'flex', textDecoration: "none" }}>
                <font color="FFDF65" size='5.5'><h1>데스티니</h1></font>

            </Link>
            <body >
                <Link to="/rating">
                    <font color="ffffff" size='5' style={{ position: 'fixed', top: '55px', left: '400px', display: 'flex' }}>평가하기</font>
                </Link><Link to="/review">
                    <font color="ffffff" size='5' style={{ position: 'fixed', top: '55px', left: '600px', display: 'flex' }} >실시간 리뷰</font>
                </Link>

            </body>
            <div class="search-box" style={{ position: 'fixed', top: '50px', left: '1100px', display: 'flex' }}>
                <form action="." method="post">
                    <input class="search-txt" type="text" placeholder="검색어를 입력해 주세요" onChange={onSearchChange}></input>
                    <button class="search-btn" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>

        </div>


    );
}


export default Header;

