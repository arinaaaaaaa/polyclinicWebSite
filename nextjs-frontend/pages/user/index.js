import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/user.module.css';

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
        <div className={styles.userPage}>
            <div className={styles.helloSection}>
                <span className={styles.userInfo}>
                    <div className={styles.hello}>Хорошего дня,</div>
                        <div className={styles.username}>{ props.patientData != null ? props.patientData.user['last_name'] + " " + props.patientData.user['first_name'] + " " + props.patientData['patronymic'] : "" } !</div>
                        <div className={styles.birthDate}>{ props.patientData != null ? 
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

    function cancelNote() {
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
                <button className={styles.item} onClick={() => setModalActive(true)}>
                    <div className={styles.speciality}>{ doctorData['speciality'] }</div>
                    <div className={styles.doctorName}>{ doctorData.user['last_name'] + " " + doctorData.user['first_name'] + " " + doctorData['patronymic']}</div>
                    <div className={styles.room}>{ "Кабинет-" + doctorData.room}</div>
                    <div className={styles.date}> { dateFormat(props.note['date']) + " " + timeFormat(noteTime)}</div>
                </button>
                <Modal active = {modalActive} setActive = {setModalActive}>
                    <div className={styles.specialityModal}>{ doctorData['speciality'] }</div>
                    <div className={styles.doctorNameModal}>{ doctorData.user['last_name'] + " " + doctorData.user['first_name'] + " " + doctorData['patronymic']}</div>
                    <div className={styles.addressModal}>{ doctorData.polyclinic.address}</div>
                    <div className={styles.dateModal}>{ dateFormat(props.note['date']) + " " + timeFormat(noteTime)}</div>
                    <div className={styles.buttonsModal}>
                        <button className={styles.deleteNote} onClick = {() => cancelNote() }>Отменить запись</button>
                        <button className={styles.closeWindow} onClick={() => setModalActive(false)}>Закрыть окно</button>
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
            if (response.status == '200') props.Router.push('/login')
        })
    }

    return (
        <div className={styles.singupSection}>
            { props.notes && props.notes.length > 0 ?
                <>
                    <div className={styles.title}>Ближайшие записи</div>
                    <div className={styles.list}>
                        {
                            props.notes.map((noteItem) => {
                                return (
                                    <ShowNoteInfo note = {noteItem} patientID = {props.patientID}/>
                                )
                            })
                        }
                    </div>
                </> : ""
            }
            <div className={styles.title}>Другое</div>
            <div className={styles.toDoList}>
                <a href="#" className={styles.profileAction}>
                    <span className={styles.actionName}><img src="/images/pen.png" alt="" /><span>Редактировать профиль</span></span>
                </a>
                <a href="/note" className={styles.profileAction}>
                    <span className={styles.actionName}><img src="/images/notes.png" alt="" /><span>Записаться на прием</span></span>
                </a>
                <a className={styles.profileAction} onClick = {logoutFunction}>
                    <span className={styles.actionName}><img src="/images/logout.png" alt="" /><span>Выйти</span></span>
                </a>
            </div>
        </div>
    )
}

function UserPage() {
    const [isLogged, setLogged] = useState(false);
    const [patientData, changeData] = useState(null)
    const [patientID, setPatientID] = useState(null)
    const [patientNotes, setPatientNotes] = useState(null)
    const Router = useRouter()

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
            if (response.data.user == null) Router.push('/login')
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
                <Header/>
                <HelloBanner patientData={patientData}/>
                <SingUps notes={patientNotes} patientID = {patientID} Router = {Router}/>
                <Footer/>
            </>
        )
    }
    else return null
}

export default UserPage;