import './AboutMe.css';
import React from 'react';

import profile from '../../../images/me.png';
import Socials from './Socials/Socials';

const AboutMe = () => (
  <>
    <h2 className="about-me__name">Студент</h2>
    <section className="about-me">
      <div className="about-me__column-info">
        <h3 className="about-me__title">Денис</h3>
        <p className="about-me__preview">Аналитик</p>
        <p className="about-me__description">
          Сменил несколько городов, в настоящее время живу в Москве, закончил факултет автоматики и информационных технологий в Самарском политехе.
          У меня есть жена и сын. Люблю путешествовать на мотоцикле и пеший туризм.
          В айти работаю всю жизнь практически, но больше в ролях аналитика, владельца продукта, менеджера проектов или тимлида.
          Захотелось глубже разобраться в веб разработке, во первых чтобы понимать возможности и правильно
          оценивать сроки, во вторых чтобы тоже что-то делать руками, а не просто ими водить
          Ну и плюс веб разработчик намного более ликвидная специальность, чем product owner
      </p>
        <Socials />
      </div>
      <img
        src={profile}
        alt="Студент"
        className="about-me__column-photo"
      />
    </section>
  </>
);

export default AboutMe;