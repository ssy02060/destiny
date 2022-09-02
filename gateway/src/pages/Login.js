import React, { Component,useState, useEffect  } from 'react';
import "../style/Login.css"
import { Link } from 'react-router-dom';

const Login =()=> {
   
    const [Id, setId] = useState('');
      const [Password, setPassword] = useState('');
      //input에 입력될 때마다 account state값 변경되게 하는 함수
      const onIdHandler= (e) => {
        setId(e.currentTarget.value);
        console.log(e.currentTarget.value)
      };

      const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
        console.log(e.currentTarget.value)
      };
     
      
      return (
         <>
            <div    className='Login_header'>
               <h1><font color="FFDF65" style={{ position: 'fixed', top: '1px', left: '95px', display: 'flex', }}><h1>DESTINY</h1></font></h1>

            </div>
            <div class="login-container">
               <div class="login-wrap">
                  
                  <section class="login-input-section-wrap">
                  <div class="login-stay-sign-in">
                  <h1 className='login_text' >로그인</h1>
                  </div>
                     <div class="login-input-wrap">
                     
                        <input id="id" name= "id" placeholder="ID" type="text"  onChange={onIdHandler}></input>
                     </div>
                     <div class="login-input-wrap password-wrap">
                        
                        <input  id="password"
        name="password"placeholder="Password" type="password" onChange={onPasswordHandler}></input>
                     </div>
                     <div class="login-button-wrap">
                        <button type='submit' >Sign in</button>
                     </div>
                     <div >
                        <Link to= '/SignUp' class="login-stay-sign-in"> 
                        <span>계정이 없으신가요?  회원가입 </span>
                        </Link>
                     </div>
                  </section>
               </div>
            </div>
         </>
      )
   
}

export const fetchLogin = async ({ id, password }) => {
   const response = await fetch("http://192.168.5.128:3000/testDB.json");
  
   if (response.ok) {
      //서버통신이 성공적으로 이루어지면 users에 json값 대입
     const users = await response.json();
  
     //users안 객체들을 순회하면서 그 객체들의 id값과 form 컴포넌트에서 받음 account의 id값과 비교
     //서로 일치하는 것만 user에 대입
     const user = users.find((user) => user.id === id);
     //일치하는 user가 없거나, 비밀번호가 틀리면 해당 에러 생성
     if (!user || user.password !== password) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
     }
  
     //모든게 일치하면 그 user 정보 return -> 이 return값이 form 컴포넌트 내 fetchLogin 함수 값으로 출력되는것
     //form 컴포넌트에서 setUser값에 넣어야함
     return user;
   }
  
   //서버 통신이 안이루어졌을떄
   throw new Error("서버 통신이 원할하지 않습니다.");
  };
export default Login;