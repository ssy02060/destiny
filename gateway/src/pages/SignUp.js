import React, { Component } from 'react';
import "../style/Login.css"
import { Link } from 'react-router-dom';
class SignUp extends Component {
	render() {
		
		return (
            <>
				<div 	className='Login_header'>
					<h1><font color="FFDF65" style={{ position: 'fixed', top: '1px', left: '95px', display: 'flex', }}><h1>DESTINY</h1></font></h1>

				</div>
				<div class="login-container">
					<div class="login-wrap">
						
						<section class="login-input-section-wrap">
						<div class="login-stay-sign-in">
						<h1 className='login_text' >회원가입</h1>
						</div>
							<div class="login-input-wrap">
							
								<input id="id" name= "id" placeholder="ID" type="text"  ></input>
							</div>
							<div class="login-input-wrap password-wrap">
								
								<input  id="password"
        name="password"placeholder="Password" type="password" ></input>
							</div>
							<div class="login-input-wrap password-wrap">
							
								<input id="name" name= "name" placeholder="name" type="text"  ></input>
							</div>
							<div class="login-input-wrap password-wrap">
							
								<input id="email" name= "email" placeholder="email" type="text"  ></input>
							</div>
							<div class="login-button-wrap">
								<button type='button'>Sign Up</button>
							</div>
							
						</section>
					</div>
				</div>
			</>
            )
	}
}

export default SignUp;