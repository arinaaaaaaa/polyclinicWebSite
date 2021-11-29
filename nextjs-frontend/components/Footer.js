import React from 'react';

function Footer() {
    return (
        <footer>
            <a href="" className="footerLogo">ПОЛИКЛИНИКА №220</a>
            <span className="sections">
                <span className="sectionLinks">
                    <p className="linkTitle">Сервисы</p>
                    <div className="link"><a href="/note">Запись к врачу</a></div>
                    <div className="link"><a href="/polyclinics">Учреждение</a></div>
                    <div className="link"><a href="/user">Медкарта</a></div>
                </span>
                <span className="sectionLinks">
                    <p className="linkTitle">Полезно</p>
                    <div className="link"><a href="/user">Личный кабинет</a></div>
                    <div className="link"><a href="">Помощь</a></div>
                    <div className="link"><a href="">Условия пользования</a></div>
                </span>
            </span>
        </footer>
    )
}

export default Footer;