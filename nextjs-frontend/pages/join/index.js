import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/join.module.css';

function SingUp() {
    const Router = useRouter()
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
            .then((response) => { 
                if (response.status == '200') Router.push('/login') 
            })
        }
    }

    return (
        <>
            <Header/>
            <div className={ styles.singupSection}>
                <div className={ styles.singup}>
                    <img src="images/singupIcon.svg"/>
                    <div className={ styles.singupForm}>
                        <div className={ styles.title}>Регистрация</div>
                        <input className={ styles.personalData} type="text" placeholder="Имя" onChange = {(event) => {setInputedName(event.target.value)}}/>
                        <input className={ styles.personalData} type="text" placeholder="Фамилия" onChange = {(event) => {setInputedSurname(event.target.value)}}/>
                        <input className={ styles.personalData} type="text" placeholder="Отчество" onChange = {(event) => {setInputedPatronymic(event.target.value)}}/>
                        <input className={ styles.personalData} type="date" placeholder="Дата рождения" onChange = {(event) => {setInputedBirthDate(event.target.value)}}/>
                        <input className={ styles.personalData} type="email" placeholder="Эл. почта" onChange = {(event) => {setInputedEmail(event.target.value)}}/>
                        <input className={ styles.personalData} type="polis" placeholder="Номер полиса" onChange = {(event) => {setInputedPolis(event.target.value)}}/>
                        <input className={ styles.personalData} type="login" placeholder="Логин" onChange = {(event) => {setInputedLogin(event.target.value)}}/>
                        <input className={ styles.personalData} type="password" placeholder="Пароль" onChange = {(event) => {setInputedPassword(event.target.value)}}/>
                        <input className={ styles.personalData} type="password" placeholder="Повторите пароль" onChange = {(event) => {setInputedPasswordConfirm(event.target.value)}}/>
                        <button type="submit" onClick = { sendJSONRegistration }>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SingUp;