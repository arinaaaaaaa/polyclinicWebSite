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
            { name : 'Вакцинация от COVID-19', path : '/images/covid.png'},
            { name : 'Мазок на COVID-19 (ПЦР)', path : '/images/covid.png'},
            { name : 'Кровь (антитела COVID-19)', path : '/images/covid.png'}
        ],
        'speciality': [
            { name : 'Участковый врач', path : '/images/doctorSpeciality.png'},
            { name : 'Уролог', path : '/images/sex.png'},
            { name : 'Хирург', path : '/images/surgeon.png'},
            { name : 'Оторноларинголог', path : 'images/nose.png'},
            { name : 'Диспансеризация/Профилактический мед.осмотр', path : '/images/doctorSpeciality.png'},
            { name : 'Офтальмолог', path : '/images/doctorSpeciality.png'},
            { name : 'Медицинский пост', path : '/images/doctorSpeciality.png'}
        ]
    }
    const [spec, setSpeciality] = useState(specialityArray)
        return (
            <>
                <Header/>
                <div className= {styles.newNoteSection}>
                    <div className= {styles.title}>Новая запись</div>
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
                        <div className= {styles.title}>Специальности</div>
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
                            <div className= {styles.title} id="doctorChoose">Выберите врача <a href="#specialityChoose" className={styles.comeBack}>Вернуться к выбору специальности</a></div>
                            <div className= {styles.chooseDoctor}>
                                {
                                    doctorsBySpeciality.map((item) => {
                                        return (
                                            <button className= {styles.doctorItem} onClick = {() => {getDoctorSchedule(item, item.id)}}>
                                                <div className= {styles.doctorItemName}>{item.user.last_name} {item.user.first_name} {item.patronymic}</div>
                                                <div className= {styles.doctorItemAddress}>{item.polyclinic.address}</div>
                                                <div className= {styles.doctorItemPolyclinic}>{item.polyclinic.name}</div>
                                                <div className= {styles.doctorItemRoom}>Кабинет {item.room}</div>
                                                <div className= {styles.doctorItemFirstDate}>Сегодня</div>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            { doctorDates ?
                            <>
                            <div className= {styles.title} id="dateChoose">Выберите дату <a href="#doctorChoose" className={styles.comeBack}
                            onClick={() => {changeChoosenTime(null)
                                            changeChoosenDate(null)
                            }}>Вернуться к выбору врача</a></div>
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
                            <div className= {styles.title}>Выберите время <a href="#dateChoose" className={styles.comeBack} onClick={() => {changeChoosenDate(null)}}>Вернуться к выбору даты</a></div>
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
                                <input type="text" placeholder = "Расскажите о своих жалобах врачу (необязательно)" className={styles.patientCommentField} onChange = {(event) => {setPatientComment(event.target.value)}}/>
                                <div className="buttonToCreateNote"><button className={styles.createNote} onClick = {() => {sendNoteData()}}>Записаться</button></div>
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
                    <div className="specialityModal">Вы уже записаны к этому врачу</div>
                    <div className="doctorNameModal">Вы уже записаны к выбранному врачу. Отмените запись или запишитесь к другому.</div>
                    <div className="buttonsModal">
                        <button className="deleteNote" onClick={() => cancelNote()}>Отменить запись</button>
                        <button className="closeWindow" onClick={() => setModalActive(false)}>Закрыть окно</button>
                    </div>
                </Modal>
                <Footer/>
            </>
        )
}

export default NotePage;