import React from 'react';
import '../Styles/Universal.css'

function Footer() {
    return (
        <footer>
            <a href="" className="footerLogo">ПОЛИКЛИНИКА №220</a>
            <span className="sections">
                <span className="sectionLinks">
                    <p className="linkTitle">Сервисы</p>
                    <div className="link"><a href="">Запись к врачу</a></div>
                    <div className="link"><a href="">Учреждение</a></div>
                    <div className="link"><a href="">Медкарта</a></div>
                </span>
                <span className="sectionLinks">
                    <p className="linkTitle">Полезно</p>
                    <div className="link"><a href="">Личный кабинет</a></div>
                    <div className="link"><a href="">Помощь</a></div>
                    <div className="link"><a href="">Условия пользования</a></div>
                </span>
            </span>
        </footer>
    )
}

export { Footer };