import React from 'react';
import './Styles/NotePage.css';

function NotePage() {
    return (
        <>
            <div className="newNoteSection">
                <div className="title">Новая запись</div>
                <div className="createNoteSection" id="specialityChoose">
                    <div className="title">Covid-19</div>
                        <div className="chooseSpeciality">
                            <button className="itemSpeciality">
                                <img src="/images/covid.png" alt="" />
                                <div className="specialityName">Вакцинация от COVID-19</div>
                            </button>
                            <button className="itemSpeciality">
                                <img src="/images/covid.png" alt="" />
                                <div className="specialityName">Мазок на COVID-19 (ПЦР)</div>
                            </button>
                            <button className="itemSpeciality">
                                <img src="/images/covid.png" alt="" />
                                <div className="specialityName">Кровь (антитела COVID-19)</div>
                            </button>
                        </div>
                    <div className="title">Специальности</div>
                    <div className="chooseSpeciality">
                        <button className="itemSpeciality">
                            <img src="/images/doctorSpeciality.png" alt="" />
                            <div className="specialityName">Участковый врач</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/sex.png" alt="" />
                            <div className="specialityName">Уролог</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/surgeon.png" alt="" />
                            <div className="specialityName">Хирург</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/sex.png" alt="" />
                            <div className="specialityName">Акушер-гениколог</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/doctorSpeciality.png" alt="" />
                            <div className="specialityName">Диспансеризация/Профилактический мед.осмотр</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/doctorSpeciality.png" alt="" />
                            <div className="specialityName">Офтальмолог</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/doctorSpeciality.png" alt="" />
                            <div className="specialityName">Медицинский пост</div>
                        </button>
                        <button className="itemSpeciality">
                            <img src="/images/nose.png" alt="" />
                            <div className="specialityName">Оторноларинголог</div>
                        </button>
                    </div>
                    <div className="title" id="doctorChoose">Выберите врача <a href="#specialityChoose" className="comeBack">Вернуться к выбору специальности</a></div>
                    <div className="chooseDoctor">
                        <button className="doctorItem">
                            <div className="doctorItemName">Фролов Артем Владимирович</div>
                            <div className="doctorItemAddress">Москва, Южнобутовская улица, д.23</div>
                            <div className="doctorItemPolyclinic">ГБУЗ КДП 121 ДЗМ</div>
                            <div className="doctorItemRoom">Кабинет 217</div>
                            <div className="doctorItemFirstDate">Сегодня</div>
                        </button>
                        <button className="doctorItem">
                            <div className="doctorItemName">Фролов Артем Владимирович</div>
                            <div className="doctorItemAddress">Москва, Южнобутовская улица, д.23</div>
                            <div className="doctorItemPolyclinic">ГБУЗ КДП 121 ДЗМ</div>
                            <div className="doctorItemRoom">Кабинет 217</div>
                            <div className="doctorItemFirstDate">Сегодня</div>
                        </button>
                        <button className="doctorItem">
                            <div className="doctorItemName">Фролов Артем Владимирович</div>
                            <div className="doctorItemAddress">Москва, Южнобутовская улица, д.23</div>
                            <div className="doctorItemPolyclinic">ГБУЗ КДП 121 ДЗМ</div>
                            <div className="doctorItemRoom">Кабинет 217</div>
                            <div className="doctorItemFirstDate">Сегодня</div>
                        </button>
                        <button className="doctorItem">
                            <div className="doctorItemName">Фролов Артем Владимирович</div>
                            <div className="doctorItemAddress">Москва, Южнобутовская улица, д.23</div>
                            <div className="doctorItemPolyclinic">ГБУЗ КДП 121 ДЗМ</div>
                            <div className="doctorItemRoom">Кабинет 217</div>
                            <div className="doctorItemFirstDate">Сегодня</div>
                        </button>
                        <button className="doctorItem">
                            <div className="doctorItemName">Фролов Артем Владимирович</div>
                            <div className="doctorItemAddress">Москва, Южнобутовская улица, д.23</div>
                            <div className="doctorItemPolyclinic">ГБУЗ КДП 121 ДЗМ</div>
                            <div className="doctorItemRoom">Кабинет 217</div>
                            <div className="doctorItemFirstDate">Сегодня</div>
                        </button>
                    </div>
                    <div className="title" id="dateChoose">Выберите дату <a href="#doctorChoose" className="comeBack">Вернуться к выбору врача</a></div>
                    <div className="chooseDate">
                        <button className="dateItem">9 ноября</button>
                        <button className="dateItem">21 ноября</button>
                        <button className="dateItem">13 декабря</button>
                        <button className="dateItem">19 декабря</button>
                        <button className="dateItem">29 декабря</button>
                        <button className="dateItem">30 декабря</button>
                        <button className="dateItem">30 декабря</button>
                        <button className="dateItem">30 декабря</button>
                    </div>
                    <div className="title">Выберите время <a href="#dateChoose" className="comeBack">Вернуться к выбору даты</a></div>
                    <div className="chooseTime">
                        <button className="timeItem">12:30</button>
                        <button className="timeItem">13:20</button>
                        <button className="timeItem">13:34</button>
                        <button className="timeItem">14:10</button>
                        <button className="timeItem">14:45</button>
                        <button className="timeItem">16:59</button>
                        <button className="timeItem">17:20</button>
                        <button className="timeItem">18:40</button>
                        <button className="timeItem">16:59</button>
                        <button className="timeItem">17:20</button>
                        <button className="timeItem">18:40</button>
                    </div>
                    <div className="buttonToCreateNote"><button className="createNote">Записаться</button></div>
                </div>
            </div>
        </>
    )
}

export { NotePage }