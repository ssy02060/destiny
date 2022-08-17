import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Review from './pages/Review';
import NotFound from './pages/NotFound';
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
                    <Route path="/review/*" element={<Review />}></Route>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </body>
    );
}
export default App;