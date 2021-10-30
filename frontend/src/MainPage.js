import React from 'react';
import { SingUp } from './Universal/SingUp'
import './Styles/MainPage.css'

function Banner() {
  return (
    <div className="bannerSection">
      <span className="bannerImg">
        <img src="/images/mainPage.svg" alt="" />
      </span>
      <span className="bannerText">
        <h2 className="bannerTitle">Место, где Вам рады помочь!</h2>
        <p className="bannerInfo">Записаться на прием ко врачу или узнать назначения врача? Найти ближайшее учреждение или посмотреть историю своих обращения? Все это возможно найти на нашем сайте.</p>
        <p className="bannerInfo">Остались вопросы?</p>
        <p className="bannerInfo">
          <span className="phone">+7 (915) 211-10-33</span>
          <img src="images/phoneIcon.svg" alt="" />
        </p>
      </span>
    </div>
  )
}
function NavSection() {
  return (
    <span className="navSection">
      <span className="singUpLink">
        <a href="">Записаться ко врачу</a>
        <ul>
          <li>Записаться на прием</li>
          <li>Перенести запись</li>
          <li>Отменить запись</li>
        </ul>
      </span>
      <span className="singUpLink">
        <a href="">Учреждения</a>
        <ul>
          <li>Найти поликлиннику по адресу</li>
          <li>Найти контактный номер</li>
          <li>Узнать время работы</li>
        </ul>
      </span>
      <span className="singUpLink">
        <a href="">Медкарта</a>
        <ul>
          <li>Узнать заключение врача</li>
          <li>Посмотреть историю посещений</li>
          <li>Найти рецепт</li>
        </ul>
      </span>
    </span>
  )
}
function OurHistory() {
  return (
    <div className="historySection">
      <div className="historyTitle">С 2020 года помогаем Вам быть здоровыми</div>
      <div className="historyItems">
        <span className="history">
          <div><img src="images/user.png" alt="" /></div>
          <p><b>Более 100 тыс. в день</b></p>
          <p>пользователей сайта.</p>
        </span>
        <span className="history">
          <div><img src="images/note.png" alt="" /></div>
          <p><b>Более 5 тыс. в день</b></p>
          <p>записей к врачу.</p>
        </span>
        <span className="history">
          <div><img src="images/userPlus.png" alt="" /></div>
          <p><b>Более 1 млн</b></p>
          <p>людей воспользовались системой.</p>
        </span>
      </div>
    </div>
  )
}

function MainPage() {
  return (
    <>
      <Banner/>
      <SingUp/>
      <NavSection/>
      <OurHistory/>
    </>
  );
}

export {MainPage};