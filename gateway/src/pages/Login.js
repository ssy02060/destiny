import React, { Component, useState, useEffect } from 'react';
import "../style/Login.css"
import { Link } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   //input에 입력될 때마다 account state값 변경되게 하는 함수
   const onIdHandler = (e) => {
      setEmail(e.currentTarget.value);
   };

   const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
   };

   const onSignIn = () => {
      axios.post('http://3.37.28.1:4001/account/signin', {
         email: email,
         password: password
      })
         .then(function (response) {
            console.log(response);
         })
         .catch(function (error) {
            console.log(error);
         });
   }

   return (
      <>
         <div className='Login_header'>
            <h1><font color="FFDF65" style={{ position: 'fixed', top: '1px', left: '95px', display: 'flex', }}><h1>DESTINY</h1></font></h1>

         </div>
         <div class="login-container">
            <div class="login-wrap">

               <section class="login-input-section-wrap">
                  <div class="login-stay-sign-in">
                     <h1 className='login_text' >로그인</h1>
                  </div>
                  <div class="login-input-wrap">

                     <input id="id" name="id" placeholder="ID" type="text" onChange={onIdHandler}></input>
                  </div>
                  <div class="login-input-wrap password-wrap">

                     <input id="password"
                        name="password" placeholder="Password" type="password" onChange={onPasswordHandler}></input>

                  </div>
                  <div>
                     <button type='submit' onClick={onSignIn} >Sign in</button>
                  </div>
                  <div >
                     <Link to='/SignUp' class="login-stay-sign-in">
                        <span>계정이 없으신가요?  회원가입 </span>
                     </Link>
                  </div>
               </section>
            </div>
         </div>
      </>
   )

}

export default Login;