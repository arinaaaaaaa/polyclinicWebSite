import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Styles/Login.css';

function Login() {
    const [inputedLogin, setInputedLogin] = useState("")
    const [inputedPassword, setInputedPassword] = useState("")
    const history = useHistory();

    function sendJSONLogin() {
        console.log("send req")
        axios.post('http://localhost:8000/login/auth/',
        {
            'login': inputedLogin,
            'password': inputedPassword
        },
        { headers: {
            "Content-Type": "application/json"
        }})
        .then((response) => { 
            if (response != null) {
                console.log(response)
            }
         })
    }

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