import React from 'react';

import './Link.css';
import { Link as ReactLink } from 'react-router-dom';

const Link = ({
    to, name,
}) => <ReactLink to={to} className="link">{name}</ReactLink>;


export default Link;
