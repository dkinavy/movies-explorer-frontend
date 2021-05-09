import React from 'react';

import './Logo.css';

import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo.svg';

const Logo = ({ link, name }) => {
  if (link) {
    return (
      <Link to={link} className="link-logo">
        <img src={logo} alt={name} className="logo" />
      </Link>
    );
  }

  return (
    <img src={logo} alt={name} className="logo" />
  );
};

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};

Logo.defaultProps = {
  link: '',
};

export default Logo;