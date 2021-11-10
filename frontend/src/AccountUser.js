import React from 'react';
import { useState } from 'react';
import { Modal } from './Universal/Modal';
import './Styles/AccountUser.css';

function HelloBanner() {
    return (
        <div className="userPage">
            <div className="helloSection">
                <span className="userInfo">
                    <div className="hello">Хорошего дня,</div>
                    <div className="username">Иванов Иван Иванович !</div>
                        <div className="birthDate">21.05.2001 (20 лет)</div>
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