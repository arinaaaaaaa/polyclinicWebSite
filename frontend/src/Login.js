import React from 'react';
import './Styles/Login.css';

function Login() {
    return (
        <div className="loginSection">
            <div className="login">
                <img src="images/loginIcon.svg"/>
                <form className="loginForm">
                    <div className="title">Авторизируйтесь</div>
                    <input type="login" placeholder="Логин"/>
                    <input type="password" placeholder="Пароль"/>
                    <button>Войти</button>
                    <p className="toSingUpLink">Впервые у нас? <a href="">Зарегистрируйтесь!</a></p>
                </form>
            </div>
        </div>
    )
}

export { Login }