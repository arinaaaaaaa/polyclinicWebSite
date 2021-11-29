import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/login.module.css'

function Login() {
    const [inputedLogin, setInputedLogin] = useState("")
    const [inputedPassword, setInputedPassword] = useState("")
    const Router = useRouter()

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
                    Router.push('/user')
                }
                else if (response.data['userType'] == "doctor") {
                    Router.push('/doctor')
                }
            }
         })
    }

    useEffect(sendJSONLogin, [])

    return (
        <>
            <Header/>
            <div className={styles.loginSection}>
                <div className={styles.login}>
                    <img src="images/loginIcon.svg"/>
                    <div className={styles.loginForm}>
                        <div className={styles.title}>Авторизируйтесь</div>
                        <input type="login" placeholder="Логин" onChange = {(event) => {setInputedLogin(event.target.value)}}/>
                        <input type="password" placeholder="Пароль" onChange = {(event) => {setInputedPassword(event.target.value)}}/>
                        <button type="submit" onClick = { sendJSONLogin }>Войти</button>
                        <p className={styles.toSingUpLink}>Впервые у нас? <a href="/join">Зарегистрируйтесь!</a></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Login;