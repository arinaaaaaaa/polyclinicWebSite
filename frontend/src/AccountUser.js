import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Modal } from './Universal/Modal';
import './Styles/AccountUser.css';


function getJSONUserData(changeData) {
    axios('http://localhost:8000/patient/data/', { withCredentials: true })
    .then((response) => { 
        changeData(response.data)
    })
}

function calculate_age(birth_month,birth_day,birth_year)
{
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if ( today_month < (birth_month - 1) || ((birth_month - 1) == today_month) && (today_day < birth_day)) age--;

    return age.toString();
}

function HelloBanner() {
    const [patientData, changeData] = useState(null)
    useEffect(() => { getJSONUserData(changeData) }, [])
    return (
        <div className="userPage">
            <div className="helloSection">
                <span className="userInfo">
                    <div className="hello">Хорошего дня,</div>
                        {console.log(patientData)}
                        <div className="username">{ patientData != null ? patientData.user['last_name'] + " " + patientData.user['first_name'] + " " + patientData['patronymic'] : null } !</div>
                        <div className="birthDate">{ patientData != null ? 
                        patientData['birthDate'].split("-")[2] + "." + patientData['birthDate'].split("-")[1] + "." +patientData['birthDate'].split("-")[0] + " " +
                        "(" + calculate_age(patientData['birthDate'].split("-")[1], patientData['birthDate'].split("-")[2], patientData['birthDate'].split("-")[0]) + " лет)" : ""}</div>
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

function SingUps() {
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
                <a href="#" className="profileAction">
                    <span className="actionName"><img src="/images/notes.png" alt="" /><span>Записаться на прием</span></span>
                </a>
            </div>
        </div>
    )
}

function UserPage() {
    return (
        <>
            <HelloBanner/>
            <SingUps/>
        </>
    )
}

export { UserPage };