import './Navigtion.css';
import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Navigation = ({ isMenu }) => {
  const menu = [
    {
      name: 'Фильмы',
      link: "/movies",
    },
    {
      name: 'Сохранённые фильмы',
      link: "/saved-movies",
    },
  ];

  return (
    <nav className={`navigation ${isMenu ? 'navigation_active' : ''}`}>
      <div className="navigation__links">
        <NavLink
          key="main"
          to="/"
          className={`navigation__link ${!isMenu ? 'navigation__link_visible' : ''}`}
        >
          Главная
        </NavLink>
        {menu.map(({ link, name }) => (
          <NavLink
            key={link}
            to={link}
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            {name}
          </NavLink>
        ))}
      </div>
      <NavLink
        key="profile"
        to="/profile"
        className="navigation__link navigation__link-profile"
        activeClassName="navigation__link-profile_active"
      >
        Аккаунт
      </NavLink>
    </nav>
  );
};

Navigation.propTypes = {
  isMenu: PropTypes.bool.isRequired,
};

export default Navigation;
