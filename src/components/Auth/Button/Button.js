import React from 'react';

import './Button.css';

const Button = ({
    children, button, ariaLabel, isActive,
}) => (
    <button
        type={button ? 'button' : 'submit'}
        className={`button ${!isActive ? 'button_disabled' : ''}`}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);


export default Button;
