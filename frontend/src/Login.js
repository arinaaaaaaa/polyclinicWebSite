import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Styles/Login.css';

function Login() {
    const [inputedLogin, setInputedLogin] = useState("")
    const [inputedPassword, setInputedPassword] = useState("")
    const history = useHistory();

    function sendJSONLogin() {
        axios('http://localhost:8000/login/auth/', {
            method: "post",
            data: {
                'login': inputedLogin,
                'password': inputedPassword
            },
            withCredentials: true
        })
        .then((response) => { 
            if (response != null) {
                if (response.data['userType'] == "patient") {
                    history.push('/user')
                }
                else if (response.data['userType'] == "doctor") {
                    history.push('/doctor')
                }
            }
         })
    }

    useEffect(sendJSONLogin, [])

    return (
        <div className="loginSection">
            <div className="login">
                <img src="images/loginIcon.svg"/>
                <div className="loginForm">
                    <div className="title">Авторизируйтесь</div>
                    <input type="login" placeholder="Логин" onChange = {(event) => {setInputedLogin(event.target.value)}}/>
                    <input type="password" placeholder="Пароль" onChange = {(event) => {setInputedPassword(event.target.value)}}/>
                    <button type="submit" onClick = { sendJSONLogin }>Войти</button>
                    <p className="toSingUpLink">Впервые у нас? <a href="">Зарегистрируйтесь!</a></p>
                </div>
            </div>
        </div>
    )
}

export { Login }