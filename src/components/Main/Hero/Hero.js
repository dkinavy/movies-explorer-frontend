import './Hero.css';
import React from 'react';

import earth from '../../../images/earth.svg';

const Hero = () => (
  <section className="hero">
    <img src={earth} className="hero__main-pic" alt="Web earth" />
    <div className="hero__info">
      <h1 className="hero__title">
        Учебный проект студента факультета
        {' '}
        <span className="hero__together">Веб-разработки</span>
        .
      </h1>
      <p className="hero__description">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
    </div>
    <a href="#aboutProject" className="hero__link">Узнать больше</a>
  </section>
);

export default Hero;