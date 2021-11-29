import React from 'react';

function SingUp() {
    return (
        <>
            <div className="singUpSection">
                <p className="singUpTitle">Для записи ко врачу заполните форму</p>
                <span className="formTitle">
                    <span>Номер полиса</span>
                    <span>Дата рождения</span>
                </span>
                <form className="singUpForm">
                    <input action="" className="polis" placeholder="Например, 1234 0000 0000 0000"></input>
                    <input action="" className="date day" placeholder="День"></input>
                    <input action="" className="date month" placeholder="Месяц"></input>
                    <input action="" className="date year" placeholder="Год"></input>
                    <button className="toSingUp">Записаться</button>
                </form>
            </div>
        </>
    )
}

export default SingUp;