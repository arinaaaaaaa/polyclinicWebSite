import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Modal } from './Universal/Modal';
import './Styles/AccountDoctor.css';

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
                    <div className="username">{ props.doctorData != null ? props.doctorData.user['last_name'] + " " + props.doctorData.user['first_name'] + " " + props.doctorData['patronymic'] : null } !</div>
                    <div className="birthDate">{ props.doctorData != null ? 
                    props.doctorData['birthDate'].split("-")[2] + "." + props.doctorData['birthDate'].split("-")[1] + "." + props.doctorData['birthDate'].split("-")[0] + " " +
                    "(" + calculateAge(props.doctorData['birthDate'].split("-")[1], props.doctorData['birthDate'].split("-")[2], props.doctorData['birthDate'].split("-")[0]) + " лет)" : ""}</div>
                </span>
                <img src="images/userAccount.svg" alt="" />
            </div>
        </div>
    )
}

function ShowNoteInfo(props) {
    const [modalActive, setModalActive] = useState(false)
    const [patientData, setPatientData] = useState(null)
    const [noteTime, setNoteTime] = useState(null)

    function getPatientByID(patientID) {
        axios.post('http://localhost:8000/patient/patient/',
        {'patientID': patientID},
        { headers: { "Content-Type": "application/json"}
        }).then((response) => {
            setPatientData(response.data)
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
    useEffect(() => {
        getPatientByID(props.noteItem.patient)
        getTimeByID(props.noteItem['time'])
    }, [])

    return(
        <>
            {patientData ?
                <>
                    <button className="item" onClick={() => setModalActive(true)}>
                        <div className="patientName">{patientData.user['last_name'] + " " + patientData.user['first_name'] + " " + patientData['patronymic']}</div>
                        <div className="patientNoteDate">{dateFormat(props.noteItem.date) + " " + timeFormat(noteTime)}</div>
                    </button>
                    <Modal active = {modalActive} setActive = {setModalActive}>
                        <div className="patientNameModal"></div>
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
                </> : ""
            }
        </>
    )
}

function SingUps(props) {
    const [doctorNotes, setDoctorNotes] = useState(null)

    useEffect(() => {
        getDoctorNotes()
    }, [])

    function getDoctorNotes() {
        axios.post('http://localhost:8000/notes/doctor/',
            {'doctorID': props.doctorID},
            { headers: { "Content-Type": "application/json"}}
        )
        .then((response) => {
            setDoctorNotes(response.data)
        })
    }
    return (
        <>
            { doctorNotes && doctorNotes.length > 0 ?
                <>
                    <div className="singupSection">
                        <span className="titleDoctor">Расписание</span>
                        <span className="searchNoteByDate">
                            <span className="inputNoteDate">Введите дату для поиска записей</span>
                            <input className="noteDate" type="Date"/>
                        </span>
                        <div className="list">
                            { 
                                doctorNotes.map((noteItem) =>
                                {
                                    return(
                                        <ShowNoteInfo noteItem = { noteItem }/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </> : ""
            }
        </>
    )
}

function DoctorPage() {
    const [doctorData, changeData] = useState(null)
    const [doctorID, setDoctorID] = useState(null)

    function getJSONDoctorData(changeData) {
        axios('http://localhost:8000/doctor/data/', { withCredentials: true })
        .then((response) => { 
            changeData(response.data)
            setDoctorID(response.data.id)
        })
    }

    useEffect(() => { getJSONDoctorData(changeData) }, [])

    return (
        <>
            <HelloBanner doctorData = { doctorData }/>
            { doctorID ?
                <SingUps doctorID = {doctorID}/> : ""
            }
        </>
    )
}

export { DoctorPage };