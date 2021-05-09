import './Header.css';
import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

// import {
//   HOME_LINK, projectName,
//   SING_IN_LINK,
//   SING_UP_LINK,
// } from '../../../utils/config';
import Logo from '../Logo/Logo';
import Navigation from './Navigation/Navigation';

const Header = () => {
  const { pathname } = useLocation();
  const [isMenu, setIsMenu] = useState(false);

  const isMenuHandle = () => {
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    setIsMenu(false);
  }, [pathname]);

  if (pathname === '/') {
    return (
      <header className="header header_theme_blue">
        <Logo name="каталог фильмов" />
        <nav className="header__menu">
          <Link
            className="header__link header__link-signup"
            to="/signup"
          >
            Регистрация
          </Link>
          <Link
            className="header__link header__link-signin"
            to="/signin"
          >
            Войти
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      <Logo
        link="/"
        name="Каталог фильмов"
      />
      <div className={` ${isMenu ? 'header__menu-container' : ''}`} />
      <Navigation
        isMenu={isMenu}
      />
      <button
        type="button"
        className={`header__button-menu ${isMenu ? 'header__button-menu-close' : ''}`}
        onClick={isMenuHandle}
        aria-label={!isMenu ? 'Открыть меню' : 'Закрыть меню'}
      />
    </header>

  );
};

export default Header;
