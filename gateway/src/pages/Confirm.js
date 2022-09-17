import React, { useState, useEffect } from 'react';
import "../style/Login.css"
import { Link } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmText, setConfirmText] = useState('');
	const [validEmailText, setValidEmailText] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [confirmCode, setConfirmCode] = useState('');

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
		isEmail(e.currentTarget.value)
	};

	const onConfirmCodeHandler = (e) => {
		setConfirmCode(e.currentTarget.value);
	};

	const onPasswordHandler = (e) => {
		setPassword(e.currentTarget.value);
		checkPassword(confirmPassword, e.currentTarget.value);
	};

	const onConfirmPasswordHandler = (e) => {
		setConfirmPassword(e.currentTarget.value);
		checkPassword(e.currentTarget.value, password);
	};

	const checkPassword = (confirmPw, pw) => {
		const element = document.getElementById('confirmText');

		if (confirmPw !== pw) {
			element.style.color = 'red';
			setConfirmText("비밀번호가 일치하지 않습니다.");
		}
		else {
			element.style.color = 'green';
			setConfirmText("비밀번호가 일치합니다.");
		}
		if (pw.length < 8) {
			element.style.color = 'red';
			setConfirmText("too short password");
		}
	}
	const isEmail = (val) => {
		const element = document.getElementById('validEmailText');
		let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!regEmail.test(val)) {
			element.style.color = 'red';
			setValidEmailText('올바르지 않은 이메일입니다.')
		} else {
			element.style.color = 'green';
			setValidEmailText('email ok')
		}
	}

	const onConfirm = () => {
		if (confirmPassword != password) {
			alert('비밀번호가 일치하지 않습니다.')
		}
		axios.post('http://3.37.28.1:4001/account/varify', {
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
							<h1 className='login_text' >회원가입</h1>
						</div>
						<div class="login-input-wrap">

							<input id="id" name="id" placeholder="Email" type="text" onChange={onEmailHandler}></input>
						</div>
						<div class="login-input-wrap password-wrap">
							<input id="confirmCode" name="confirmCode" placeholder="Confirm Code" type="text" onChange={onConfirmCodeHandler}></input>
						</div>

						<div>
							<button type='submit' onClick={onConfirm} >Sign Up</button>
						</div>

					</section>
				</div>
			</div>
		</>
	)
}

export default SignUp;