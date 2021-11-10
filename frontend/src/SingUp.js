import React from 'react';
import './Styles/SingUp.css';

function SingUp() {
    return (
        <div className="singupSection">
            <div className="singup">
                <img src="images/singupIcon.svg"/>
                <form className="singupForm">
                    <div className="title">Регистрация</div>
                    <input className="personalData" type="text" placeholder="Имя"/>
                    <input className="personalData" type="text" placeholder="Фамилия"/>
                    <input className="personalData" type="text" placeholder="Отчество"/>
                    <input className="personalData" type="date" placeholder="Дата рождения"/>
                    <input className="personalData" type="phone" placeholder="Номер телефона"/>
                    <input className="personalData" type="polis" placeholder="Номер полиса"/>
                    <input className="personalData" type="login" placeholder="Логин"/>
                    <input className="personalData" type="password" placeholder="Пароль"/>
                    <input className="personalData" type="password" placeholder="Повторите пароль"/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}

export { SingUp };