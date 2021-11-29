import React from 'react';

function Header() {
    return (
        <>
            <div className="header">
                <span className="links">
                    <a href="/">ГЛАВНАЯ</a>
                    <a href="/note">ЗАПИСАТЬСЯ НА ПРИЕМ</a>
                    <a href="/polyclinics">УЧРЕЖДЕНИЯ</a>
                    <a href="/user">УЧЕТНАЯ ЗАПИСЬ</a>
                </span>
                <a href="/" className="logo">ПОЛИКЛИНИКА №220</a>
            </div>
        </>
    )
}

export default Header;