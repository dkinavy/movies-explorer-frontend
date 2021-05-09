import './Socials.css';
import React from 'react';

const Socials = () => (
  <nav className="socials">
    <ul className="socials__items">
      <li className="socials__item">
        <a
          href="https://www.facebook.com/"
          className="socials__link"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </li>
      <li className="socials__item">
        <a
          href="https://github.com/"
          className="socials__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </li>
    </ul>
  </nav>
);

export default Socials;
