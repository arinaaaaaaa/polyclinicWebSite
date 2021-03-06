import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';
import styles from '../../styles/note.module.css';

function NotePage() {
    const Router = useRouter()
    const [patientData, changeData] = useState(null)
    const [doctorsBySpeciality, changeDoctorsData] = useState(null)
    const [doctorDates, changeDoctorDates] = useState(null)
    const [choosenDate, changeChoosenDate] = useState(null)
    const [choosenTime, changeChoosenTime] = useState(null)
    const [doctorTime, changeDoctorTime] = useState(null)
    const [doctorItem, changeDoctorItem] = useState(null)
    const [patientComment, setPatientComment] = useState(null)
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        getJSONUserData(changeData)},
    [])

    function getJSONUserData(changeData) {
        axios('http://localhost:8000/patient/data/', { withCredentials: true })
        .then((response) => { 
            if (response.data.user == null) Roter.push('/login')
            else if (response.data.userType == 'doctor') Router.push('/doctor')
            else changeData(response.data)
        })
    }
    function getDoctorBySpeciality(speciality) {
        axios.post('http://localhost:8000/doctor/speciality/',
            { 'speciality': speciality },
            { headers: { "Content-Type": "application/json" }
        })
        .then((response) => { 
            changeDoctorsData(response.data)
        })
    }
    function getDoctorSchedule(doctor, id) {
        changeDoctorItem(doctor);
        axios.get('http://localhost:8000/doctor/dates/' + id + "/" )
        .then((response) => {
            changeDoctorDates(response.data)
        })
    }
    function getDoctorTime(choosenUserDate, id) {
        changeChoosenDate(choosenUserDate)
        axios.post('http://localhost:8000/doctor/freetime/' + id + "/" , { 
            "choosenDate": choosenUserDate,
         }, 
            { headers: { "Content-Type": "application/json"}
        }).then((response) => {
            changeDoctorTime(response.data)
        })
    }
    function renderDate(date) {
        date = date.split('-')
        var month = ''
        if (date[1] == '01') month = '????????????'
        else if (date[1] == '02') month = '??????????????'
        else if (date[1] == '03') month = '??????????'
        else if (date[1] == '04') month = '????????????'
        else if (date[1] == '05') month = '??????'
        else if (date[1] == '06') month = '????????'
        else if (date[1] == '07') month = '????????'
        else if (date[1] == '08') month = '??????????????'
        else if (date[1] == '09') month = '????????????????'
        else if (date[1] == '10') month = '??????????????'
        else if (date[1] == '11') month = '????????????'
        else if (date[1] == '12') month = '??????????????'

        var day = date[2].split('')
        if (day[0] == '0') day[0] = ''
        day = day.join('')
        return (day + " " + month)
    }
    function sendNoteData() {
        axios.post('http://localhost:8000/notes/create/',
        {
            'patientID': patientData.id,
            'doctorID': doctorItem.id,
            'date': choosenDate,
            'time': choosenTime,
            'comment': patientComment
        },
        { headers: {
            "Content-Type": "application/json"
        }})
        .then((response) => {
            if (response.data.status == 'ALREADY EXISTS') setModalActive(true)
            else Router.push('/user')
        })
    }
    function cancelNote() {
        console.log(patientData.id)
        axios.delete('http://localhost:8000/notes/delete/',
        { headers: {
            "Content-Type": "application/json"
        },
        data: {
            'patientID': patientData.id,
            'doctorID': doctorItem.id
        },
        })
        .then((response) => {
            Router.push('/user')
        })
    }
    const specialityArray = {
        'covid': [
            { name : '???????????????????? ???? COVID-19', path : '/images/covid.png'},
            { name : '?????????? ???? COVID-19 (??????)', path : '/images/covid.png'},
            { name : '?????????? (???????????????? COVID-19)', path : '/images/covid.png'}
        ],
        'speciality': [
            { name : '???????????????????? ????????', path : '/images/doctorSpeciality.png'},
            { name : '????????????', path : '/images/sex.png'},
            { name : '????????????', path : '/images/surgeon.png'},
            { name : '????????????????????????????????', path : 'images/nose.png'},
            { name : '??????????????????????????????/???????????????????????????????? ??????.????????????', path : '/images/doctorSpeciality.png'},
            { name : '??????????????????????', path : '/images/doctorSpeciality.png'},
            { name : '?????????????????????? ????????', path : '/images/doctorSpeciality.png'}
        ]
    }
    const [spec, setSpeciality] = useState(specialityArray)
        return (
            <>
                <Header/>
                <div className= {styles.newNoteSection}>
                    <div className= {styles.title}>?????????? ????????????</div>
                    <div className= {styles.createNoteSection} id="specialityChoose">
                        <div className= {styles.title}>Covid-19</div>
                            <div className= {styles.chooseSpeciality}>
                                { 
                                    spec['covid'].map(item => {
                                        return (
                                            <button className= {styles.itemSpeciality} onClick = {() =>{getDoctorBySpeciality(item.name)}}>
                                                <img src={item.path} alt="" />
                                                <div className= {styles.specialityName}>{item.name}</div>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        <div className= {styles.title}>??????????????????????????</div>
                        <div className= {styles.chooseSpeciality}>
                            { spec['speciality'].map(item => {
                                    return (
                                        <button className= {styles.itemSpeciality} onClick = {() =>{getDoctorBySpeciality(item.name)}}>
                                            <img src={item.path} alt="" />
                                            <div className= {styles.specialityName}>{item.name}</div>
                                        </button>
                                    )
                                })
                            }
                        </div>
                        { doctorsBySpeciality && doctorsBySpeciality.length > 0 ? 
                        <>
                            <div className= {styles.title} id="doctorChoose">???????????????? ?????????? <a href="#specialityChoose" className={styles.comeBack}>?????????????????? ?? ???????????? ??????????????????????????</a></div>
                            <div className= {styles.chooseDoctor}>
                                {
                                    doctorsBySpeciality.map((item) => {
                                        return (
                                            <button className= {styles.doctorItem} onClick = {() => {getDoctorSchedule(item, item.id)}}>
                                                <div className= {styles.doctorItemName}>{item.user.last_name} {item.user.first_name} {item.patronymic}</div>
                                                <div className= {styles.doctorItemAddress}>{item.polyclinic.address}</div>
                                                <div className= {styles.doctorItemPolyclinic}>{item.polyclinic.name}</div>
                                                <div className= {styles.doctorItemRoom}>?????????????? {item.room}</div>
                                                <div className= {styles.doctorItemFirstDate}>??????????????</div>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            { doctorDates ?
                            <>
                            <div className= {styles.title} id="dateChoose">???????????????? ???????? <a href="#doctorChoose" className={styles.comeBack}
                            onClick={() => {changeChoosenTime(null)
                                            changeChoosenDate(null)
                            }}>?????????????????? ?? ???????????? ??????????</a></div>
                            <div className= {styles.chooseDate}>
                                {
                                    doctorDates.map((dateItem) => {
                                        return (
                                            <button className= {styles.dateItem} onClick = {() => { getDoctorTime(dateItem, doctorItem.id)}}>{renderDate(dateItem)}</button>
                                        )
                                    })
                                }
                            </div>
                            { doctorTime ?
                            <>
                            <div className= {styles.title}>???????????????? ?????????? <a href="#dateChoose" className={styles.comeBack} onClick={() => {changeChoosenDate(null)}}>?????????????????? ?? ???????????? ????????</a></div>
                            <div className= {styles.chooseTime}>
                                {
                                    doctorTime.map(timeItem => {
                                        return (
                                            <button className= {styles.timeItem} onClick = {() => { changeChoosenTime(timeItem) }}>{ timeItem }</button>
                                        )
                                    })
                                }
                            </div>

                            { choosenTime ?
                                <>
                                <input type="text" placeholder = "???????????????????? ?? ?????????? ?????????????? ?????????? (??????????????????????????)" className={styles.patientCommentField} onChange = {(event) => {setPatientComment(event.target.value)}}/>
                                <div className="buttonToCreateNote"><button className={styles.createNote} onClick = {() => {sendNoteData()}}>????????????????????</button></div>
                                </> : ""
                            }
                            </> : ""
                            }
                            </> : ""
                        }
                        </> : ""
                    }
                    </div>
                </div>
                <Modal active = {modalActive} setActive = {setModalActive}>
                    <div className="specialityModal">???? ?????? ???????????????? ?? ?????????? ??????????</div>
                    <div className="doctorNameModal">???? ?????? ???????????????? ?? ???????????????????? ??????????. ???????????????? ???????????? ?????? ???????????????????? ?? ??????????????.</div>
                    <div className="buttonsModal">
                        <button className="deleteNote" onClick={() => cancelNote()}>???????????????? ????????????</button>
                        <button className="closeWindow" onClick={() => setModalActive(false)}>?????????????? ????????</button>
                    </div>
                </Modal>
                <Footer/>
            </>
        )
}

export default NotePage;