import React, { useState } from 'react';
import axios from 'axios';
import './Styles/SingUp.css';

function SingUp() {
    const [inputedName, setInputedName] = useState("")
    const [inputedSurname, setInputedSurname] = useState("")
    const [inputedPatronymic, setInputedPatronymic] = useState("")
    const [inputedBirthDate, setInputedBirthDate] = useState("")
    const [inputedEmail, setInputedEmail] = useState("")
    const [inputedPolis, setInputedPolis] = useState("")
    const [inputedLogin, setInputedLogin] = useState("")
    const [inputedPassword, setInputedPassword] = useState("")
    const [inputedPasswordConfirm, setInputedPasswordConfirm] = useState("")

    function sendJSONRegistration() {
        if (inputedPassword == inputedPasswordConfirm) {
            axios.post('http://localhost:8000/patient/join/',
            {
                'name': inputedName,
                'surname': inputedSurname,
                'patronymic': inputedPatronymic,
                'birthDate': inputedBirthDate,
                'email': inputedEmail,
                'polis': inputedPolis,
                'login': inputedLogin,
                'password': inputedPassword
            },
            { headers: {
                "Content-Type": "application/json"
            }})
            .then((response) => { alert(response) })
        }
    }

    return (
        <div className="singupSection">
            <div className="singup">
                <img src="images/singupIcon.svg"/>
                <div className="singupForm">
                    <div className="title">Регистрация</div>
                    <input className="personalData" type="text" placeholder="Имя" onChange = {(event) => {setInputedName(event.target.value)}}/>
                    <input className="personalData" type="text" placeholder="Фамилия" onChange = {(event) => {setInputedSurname(event.target.value)}}/>
                    <input className="personalData" type="text" placeholder="Отчество" onChange = {(event) => {setInputedPatronymic(event.target.value)}}/>
                    <input className="personalData" type="date" placeholder="Дата рождения" onChange = {(event) => {setInputedBirthDate(event.target.value)}}/>
                    <input className="personalData" type="email" placeholder="Эл. почта" onChange = {(event) => {setInputedEmail(event.target.value)}}/>
                    <input className="personalData" type="polis" placeholder="Номер полиса" onChange = {(event) => {setInputedPolis(event.target.value)}}/>
                    <input className="personalData" type="login" placeholder="Логин" onChange = {(event) => {setInputedLogin(event.target.value)}}/>
                    <input className="personalData" type="password" placeholder="Пароль" onChange = {(event) => {setInputedPassword(event.target.value)}}/>
                    <input className="personalData" type="password" placeholder="Повторите пароль" onChange = {(event) => {setInputedPasswordConfirm(event.target.value)}}/>
                    <button type="submit" onClick = { sendJSONRegistration }>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    )
}

export { SingUp };