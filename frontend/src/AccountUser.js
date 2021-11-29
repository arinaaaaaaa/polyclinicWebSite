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

function ShowNoteInfo(props) {
    const [modalActive, setModalActive] = useState(false)
    const [doctorData, setDoctorData] = useState(null)
    const [noteTime, setNoteTime] = useState(null)

    function getDoctorData(doctorID) {
        axios.post('http://localhost:8000/doctor/doctor/',
        {'doctorID': doctorID},
        { headers: { "Content-Type": "application/json"}
        }).then((response) => {
            setDoctorData(response.data)
        })
    }
    function getTimeByID(timeID) {
        axios.post('http://localhost:8000/doctor/time/',
        {'timeID': timeID},
        { headers: { "Content-Type": "application/json"}
        }).then((response) => {
            return setNoteTime(response.data['currentTime'])
        })
    }

    function cancelNote(history) {
        axios.delete('http://localhost:8000/notes/delete/',
        { headers: { "Content-Type": "application/json" },
        data: {
            'patientID': props.patientID,
            'doctorID': doctorData.id
        }})
        .then((response) => {
            document.location.reload()
        })
    }

    useEffect(() => {
        getDoctorData(props.note['doctor']);
        getTimeByID(props.note['time'])
    }, [])

    function dateFormat(date) {
        date = date.split('-')
        var month = ''
        if (date[1] == '01') month = 'января'
        else if (date[1] == '02') month = 'февраля'
        else if (date[1] == '03') month = 'марта'
        else if (date[1] == '04') month = 'апреля'
        else if (date[1] == '05') month = 'мая'
        else if (date[1] == '06') month = 'июня'
        else if (date[1] == '07') month = 'июля'
        else if (date[1] == '08') month = 'августа'
        else if (date[1] == '09') month = 'сентября'
        else if (date[1] == '10') month = 'октября'
        else if (date[1] == '11') month = 'ноября'
        else if (date[1] == '12') month = 'декабря'

        var day = date[2].split('')
        if (day[0] == '0') day[0] = ''
        day = day.join('')
        return (day + " " + month)
    }
    function timeFormat(time) {
        var result = ""
        time = time.toString().split(':')
        result = time[0] + ":" + time[1]
        return result
    }

    return(
        <>
            { doctorData ? 
            <>
                <button className="item" onClick={() => setModalActive(true)}>
                    <div className="speciality">{ doctorData['speciality'] }</div>
                    <div className="doctorName">{ doctorData.user['last_name'] + " " + doctorData.user['first_name'] + " " + doctorData['patronymic']}</div>
                    <div className="room">{ "Кабинет-" + doctorData.room}</div>
                    <div className="date"> { dateFormat(props.note['date']) + " " + timeFormat(noteTime)}</div>
                </button>
                <Modal active = {modalActive} setActive = {setModalActive}>
                    <div className="specialityModal">{ doctorData['speciality'] }</div>
                    <div className="doctorNameModal">{ doctorData.user['last_name'] + " " + doctorData.user['first_name'] + " " + doctorData['patronymic']}</div>
                    <div className="addressModal">{ doctorData.polyclinic.address}</div>
                    <div className="dateModal">{ dateFormat(props.note['date']) + " " + timeFormat(noteTime)}</div>
                    <div className="buttonsModal">
                        <button className="deleteNote" onClick = {() => cancelNote() }>Отменить запись</button>
                        <button className="closeWindow" onClick={() => setModalActive(false)}>Закрыть окно</button>
                    </div>
                </Modal>
            </> : ""}
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
            { props.notes && props.notes.length > 0 ?
                <>
                    <div className="title">Ближайшие записи</div>
                    <div className="list">
                        {
                            props.notes.map((noteItem) => {
                                return (
                                    <ShowNoteInfo note = {noteItem} patientID = {props.patientID} history = {props.history}/>
                                )
                            })
                        }
                    </div>
                </> : ""
            }
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
    const [patientID, setPatientID] = useState(null)
    const [patientNotes, setPatientNotes] = useState(null)

    function getPatientNotes(patientID) {
        axios.post('http://localhost:8000/notes/patient/',
            {'patientID': patientID },
            { headers: { "Content-Type": "application/json"}}
        )
        .then((response) => {
            setPatientNotes(response.data)
        })
    }

    useEffect(() => {
        getJSONUserData(changeData);
    },[])

    function getJSONUserData(changeData) {
        axios('http://localhost:8000/patient/data/', { withCredentials: true })
        .then((response) => { 
            if (response.data.user == null) history.push('/login')
            else {
                setPatientID(response.data.id)
                changeData(response.data)
                setLogged(true)
                getPatientNotes(response.data.id)
            }
        })
    }


    if (isLogged == true) {
        return (
            <>
                <HelloBanner patientData={patientData}/>
                <SingUps history={history} notes={patientNotes} patientID = {patientID}/>
            </>
        )
    }
    else return null
}

export { UserPage };