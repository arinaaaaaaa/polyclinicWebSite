import React from 'react';
import '../Styles/Universal.css'

function Header() {
    return (
        <>
            <div className="header">
                <span className="links">
                    <a href="/">ГЛАВНАЯ</a>
                    <a href="">ЗАПИСАТЬСЯ НА ПРИЕМ</a>
                    <a href="/clinics">УЧРЕЖДЕНИЯ</a>
                    <a href="">УЧЕТНАЯ ЗАПИСЬ</a>
                </span>
                <a href="/" className="logo">ПОЛИКЛИНИКА №220</a>
            </div>
        </>
    )
}

export { Header };