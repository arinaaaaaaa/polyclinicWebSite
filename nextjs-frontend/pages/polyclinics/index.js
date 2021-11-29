import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/addresses.module.css'

function getJSONPolyclinicsData(changeData) {
    axios('http://localhost:8000/polyclinic/data/', { withCredentials: true })
    .then((response) => { 
        changeData(response.data)
    })
}

function Addresses() {
    const [polyclinicsData, changeData] = useState(null)
    useEffect(() => { getJSONPolyclinicsData(changeData) }, [])

    return (
        <>
            <Header/>
            <div className={styles.addressesSection}>
                <div className={styles.title}>Учреждения</div>
                <div className={styles.address}>
                    <span className={styles.search}>
                        <input type="text" className={styles.searchByName} placeholder="Поиск"/>
                        <select className = {styles.select}name="Станции метро" id="">
                            <option selected disabled>Станция метро</option>
                            <option value="">Пражская</option>
                            <option value="">Пражская</option>
                            <option value="">Пражская</option>
                        </select>
                        <select className = {styles.select}name="" id="">
                            <option selected disabled>Тип учреждений</option>
                            <option value="">Женская консультация</option>
                            <option value="">Женская консультация</option>
                            <option value="">Женская консультация</option>
                        </select>
                    </span>
                    <span className={styles.clinic}>
                        { polyclinicsData != null ? polyclinicsData.map(item => (
                            <div className={styles.point}>
                                <div className={styles.pointType}>{ item.polyclinicType }</div>
                                <div className={styles.pointName}>{ item.name }</div>
                                <div className={styles.pointAddress}>{ item.address }</div>
                                <div className={styles.pointPhone}>{ item.phone }</div>
                                <hr />
                                <div className={styles.pointMetro}>{ item.metro }</div>
                            </div>
                        )) : "" }
                    </span>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Addresses;