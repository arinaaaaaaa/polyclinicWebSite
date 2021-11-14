import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Modal } from './Universal/Modal';
import './Styles/AccountDoctor.css';

function getJSONDoctorData(changeData) {
    axios('http://localhost:8000/doctor/data/', { withCredentials: true })
    .then((response) => { 
        console.log(response.data)
        changeData(response.data)
    })
}

function calculate_age(birthMonth,birthDay,birthYear) {
    var todayDate = new Date();
    var todayYear = todayDate.getFullYear();
    var todayMonth = todayDate.getMonth();
    var todayDay = todayDate.getDate();
    var age = todayYear - birthYear;

    if ( todayMonth < (birthMonth - 1) || ((birthMonth - 1) == todayMonth) && (todayDay < birthDay)) age--;

    return age.toString();
}

function HelloBanner() {
    const [doctorData, changeData] = useState(null)
    useEffect(() => { getJSONDoctorData(changeData) }, [])

    return (
        <div className="userPage">
            <div className="helloSection">
                <span className="userInfo">
                    <div className="hello">Хорошего дня,</div>
                    <div className="username">{ doctorData != null ? doctorData.user['last_name'] + " " + doctorData.user['first_name'] + " " + doctorData['patronymic'] : null } !</div>
                    <div className="birthDate">{ doctorData != null ? 
                    doctorData['birthDate'].split("-")[2] + "." + doctorData['birthDate'].split("-")[1] + "." + doctorData['birthDate'].split("-")[0] + " " +
                    "(" + calculate_age(doctorData['birthDate'].split("-")[1], doctorData['birthDate'].split("-")[2], doctorData['birthDate'].split("-")[0]) + " лет)" : ""}</div>
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
                <div className="patientName">Иванов Иван Иванович</div>
                <div className="patientNoteDate">22 ноября 2021 9:45</div>
            </button>
            <Modal active = {modalActive} setActive = {setModalActive}>
                <div className="patientNameModal">Иванов Иван Иванович</div>
                <div className="patientPhoneModal">+7 (915) 211-10-33</div>
                <div className="commentModal">Комментарий пациента:</div>
                <div className="patientCommentModal">Усталость, аппатия, боли в голове и все такое...</div>
                <div className="addressNoteModal">Москва, ул.Веневская 19/4 Кабинет 213</div>
                <div className="patientNoteDateModal">22 ноября 2021 9:45</div>
                <div className="buttonsModal">
                    <div></div>
                    <button className="closeWindow" onClick={() => setModalActive(false)}>Закрыть окно</button>
                </div>
            </Modal>
        </>
    )
}

function SingUps() {
    return (
        <div className="singupSection">
            <span className="titleDoctor">Расписание</span>
            <span className="searchNoteByDate">
                <span className="inputNoteDate">Введите дату для поиска записей</span>
                <input className="noteDate" type="Date"/>
            </span>
            <div className="list">
                <ShowNoteInfo/>
                <ShowNoteInfo/>
                <ShowNoteInfo/>
            </div>
        </div>
    )
}

function DoctorPage() {
    return (
        <>
            <HelloBanner/>
            <SingUps/>
        </>
    )
}

export { DoctorPage };