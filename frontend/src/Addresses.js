import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Styles/Addresses.css'

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
            <div className="addressesSection">
                <div className="title">Учреждения</div>
                <div className="address">
                    <span className="search">
                        <input type="text" className="searchByName" placeholder="Поиск"/>
                        <select name="Станции метро" id="">
                            <option selected disabled>Станция метро</option>
                            <option value="">Пражская</option>
                            <option value="">Пражская</option>
                            <option value="">Пражская</option>
                        </select>
                        <select name="" id="">
                            <option selected disabled>Тип учреждений</option>
                            <option value="">Женская консультация</option>
                            <option value="">Женская консультация</option>
                            <option value="">Женская консультация</option>
                        </select>
                    </span>
                    <span className="clinic">
                        { polyclinicsData != null ? polyclinicsData.map(item => (
                            <div className="point">
                                <div className="pointType">{ item.polyclinicType }</div>
                                <div className="pointName">{ item.name }</div>
                                <div className="pointAddress">{ item.address }</div>
                                <div className="pointPhone">{ item.phone }</div>
                                <hr />
                                <div className="pointMetro">{ item.metro }</div>
                            </div>
                        )) : "" }
                    </span>
                </div>
            </div>
        </>
    )
}

export { Addresses };