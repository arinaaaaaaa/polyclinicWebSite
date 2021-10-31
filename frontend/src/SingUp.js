import React from 'react';
import './Styles/SingUp.css';

function SingUp() {
    return (
        <div className="singupSection">
            <div className="singup">
                <img src="images/singupIcon.svg"/>
                <form className="singupForm">
                    <div className="title">Регистрация</div>
                    <input type="text" placeholder="Имя"/>
                    <input type="text" placeholder="Фамилия"/>
                    <input type="text" placeholder="Отчество"/>
                    <input type="date" placeholder="Дата рождения"/>
                    <input type="phone" placeholder="Номер телефона"/>
                    <input type="polis" placeholder="Номер полиса"/>
                    <input type="login" placeholder="Логин"/>
                    <input type="password" placeholder="Пароль"/>
                    <input type="password" placeholder="Повторите пароль"/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}

export { SingUp };