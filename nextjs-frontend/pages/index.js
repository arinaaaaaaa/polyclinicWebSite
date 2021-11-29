import React from 'react';
import SingUp from '../components/SingUp'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/main.module.css'

function Banner() {
  return (
    <div className={styles.bannerSection}>
      <span className={styles.bannerImg}>
        <img src="/images/mainPage.svg" alt="" />
      </span>
      <span className={styles.bannerText}>
        <h2 className={styles.bannerTitle}>Место, где Вам рады помочь!</h2>
        <p className={styles.bannerInfo}>Записаться на прием ко врачу или узнать назначения врача? Найти ближайшее учреждение или посмотреть историю своих обращения? Все это возможно найти на нашем сайте.</p>
        <p className={styles.bannerInfo}>Остались вопросы?</p>
        <p className={styles.bannerInfo}>
          <span className={styles.phone}>+7 (915) 211-10-33</span>
          <img src="images/phoneIcon.svg" alt="" />
        </p>
      </span>
    </div>
  )
}
function NavSection() {
  return (
    <span className={styles.navSection}>
      <span className={styles.singUpLink}>
        <a href="/note">Записаться ко врачу</a>
        <ul>
          <li>Записаться на прием</li>
          <li>Перенести запись</li>
          <li>Отменить запись</li>
        </ul>
      </span>
      <span className={styles.singUpLink}>
        <a href="/polyclinics">Учреждения</a>
        <ul>
          <li>Найти поликлиннику по адресу</li>
          <li>Найти контактный номер</li>
          <li>Узнать время работы</li>
        </ul>
      </span>
      <span className={styles.singUpLink}>
        <a href="/user">Медкарта</a>
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
    <div className={styles.historySection}>
      <div className={styles.historyTitle}>С 2020 года помогаем Вам быть здоровыми</div>
      <div className={styles.historyItems}>
        <span className={styles.history}>
          <div><img src="images/user.png" alt="" /></div>
          <p><b>Более 100 тыс. в день</b></p>
          <p>пользователей сайта.</p>
        </span>
        <span className={styles.history}>
          <div><img src="images/note.png" alt="" /></div>
          <p><b>Более 5 тыс. в день</b></p>
          <p>записей к врачу.</p>
        </span>
        <span className={styles.history}>
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
      <Header/>
      <Banner/>
      <SingUp/>
      <NavSection/>
      <OurHistory/>
      <Footer/>
    </>
  );
}

export default MainPage;