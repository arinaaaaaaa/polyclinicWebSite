import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal } from './Universal/Modal';
import './Styles/AccountUser.css';

function HelloBanner(props) {
    function calculateAge(birthMonth,birthDay,birthYear) {
        var todayDate = new Date();
        var todayYear = todayDate.getFullYear();
        var todayMonth = todayDate.getMonth();
        var todayDay = todayDate.getDate();
        var age = todayYear - birthYear;
    
        if ( todayMonth < (birthMonth - 1) || ((birthMonth - 1) == todayMonth) && (todayDay < birthDay)) age--;
    
        return age.toString();
    }
    return (
        <div className="userPage">
            <div className="helloSection">
                <span className="userInfo">
                    <div className="hello">Хорошего дня,</div>
                        <div className="username">{ props.patientData != null ? props.patientData.user['last_name'] + " " + props.patientData.user['first_name'] + " " + props.patientData['patronymic'] : "" } !</div>
                        <div className="birthDate">{ props.patientData != null ? 
                        props.patientData['birthDate'].split("-")[2] + "." + props.patientData['birthDate'].split("-")[1] + "." + props.patientData['birthDate'].split("-")[0] + " " +
                        "(" + calculateAge(props.patientData['birthDate'].split("-")[1], props.patientData['birthDate'].split("-")[2], props.patientData['birthDate'].split("-")[0]) + " лет)" : ""}</div>
                </span>
                <img src="images/userAccount.svg" alt="" />
            </div>
        </div>
    )
}

function ShowNoteInfo() {
    const [modalActive, setModalActive] = useState(false)
    return(
        <>
            <button className="item" onClick={() => setModalActive(true)}>
                <div className="speciality">Врач-терапевт участковый</div>
                <div className="doctorName">Байкалова Ольга Викторовна</div>
                <div className="room">К-213</div>
                <div className="date"> 30 августа 2021 9:15</div>
            </button>
            <Modal active = {modalActive} setActive = {setModalActive}>
                <div className="specialityModal">Врач-терапевт участковый</div>
                <div className="doctorNameModal">Байкалова Ольга Викторовна</div>
                <div className="addressModal">Москва, ул.Веневская 19/4 Кабинет 213</div>
                <div className="dateModal"> 30 августа 2021 9:15</div>
                <div className="buttonsModal">
                    <button className="deleteNote">Отменить запись</button>
                    <button className="closeWindow" onClick={() => setModalActive(false)}>Закрыть окно</button>
                </div>
            </Modal>
        </>
    )
}

function SingUps(props) {
    function logoutFunction() {
        axios('http://localhost:8000/login/logout/', { withCredentials: true })
        .then((response) => { 
            if (response.status == '200') props.history.push('/login')
        })
    }

    return (
        <div className="singupSection">
            <div className="title">Ближайшие записи</div>
            <div className="list">
                <ShowNoteInfo/>
                <ShowNoteInfo/>
                <ShowNoteInfo/>
            </div>
            <div className="title">Другое</div>
            <div className="toDoList">
                <a href="#" className="profileAction">
                    <span className="actionName"><img src="/images/pen.png" alt="" /><span>Редактировать профиль</span></span>
                </a>
                <a href="/note" className="profileAction">
                    <span className="actionName"><img src="/images/notes.png" alt="" /><span>Записаться на прием</span></span>
                </a>
                <a className="profileAction" onClick = {logoutFunction}>
                    <span className="actionName"><img src="/images/logout.png" alt="" /><span>Выйти</span></span>
                </a>
            </div>
        </div>
    )
}

function UserPage() {
    var history = useHistory();
    const [isLogged, setLogged] = useState(false);
    const [patientData, changeData] = useState(null)

    useEffect(() => {
        getJSONUserData(changeData)},
    [])

    function getJSONUserData(changeData) {
        axios('http://localhost:8000/patient/data/', { withCredentials: true })
        .then((response) => { 
            if (response.data.user == null) history.push('/login')
            else {
                changeData(response.data)
                setLogged(true)
            }
        })
    }


    if (isLogged == true) {
        return (
            <>
                <HelloBanner patientData={patientData}/>
                <SingUps history={history}/>
            </>
        )
    }
    else return null
}

export { UserPage };