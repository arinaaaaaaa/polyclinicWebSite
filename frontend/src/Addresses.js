import React from 'react';
import './Styles/Addresses.css'

function Addresses() {
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
                        <div className="point">
                            <div className="pointType">ЖЕНСКАЯ КОНСУЛЬТАЦИЯ</div>
                            <div className="pointName">ПОЛИКЛИНИКА №220 ЖК Отделение №7</div>
                            <div className="pointAddress">г.Москва ул.Пушкинская 17к1</div>
                            <div className="pointPhone">+7 (499) 217-03-19</div>
                            <hr />
                            <div className="pointMetro">Пражская</div>
                        </div>
                        <div className="point">
                            <div className="pointType">ЖЕНСКАЯ КОНСУЛЬТАЦИЯ</div>
                            <div className="pointName">ПОЛИКЛИНИКА №220 ЖК Отделение №7</div>
                            <div className="pointAddress">г.Москва ул.Пушкинская 17к1</div>
                            <div className="pointPhone">+7 (499) 217-03-19</div>
                            <hr />
                            <div className="pointMetro">Пражская</div>
                        </div>
                    </span>
                </div>
            </div>
        </>
    )
}

export { Addresses };