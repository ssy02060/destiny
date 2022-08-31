import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Review from './pages/Review';
import Login from './pages/Login';
import Rating from './pages/Rating';
import NotFound from './pages/NotFound';
import MyType from './pages/MyType';
import SignUp from './pages/SignUp';


import Header from './components/Header';

import { IoSearchSharp } from 'react-icons/fa';

const App = () => {
   
    return (
        <body  >
            <BrowserRouter>
                {/* <Header /> */}
                <Header />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/Review/*" element={<Review />}></Route>
                    <Route path="/Login/*" element={<Login />}></Route>
                    <Route path="/mytype/*" element={<MyType />}></Route>
                    <Route path="/rating/*" element={<Rating />}></Route>
                    <Route path="/SignUp/*" element={<SignUp />}></Route>
                
                   
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
            
            
        </body>
    );
}
export default App;