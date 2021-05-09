import './ButtonMore.css';
import React from 'react';

const ButtonMore = ({ children, onClick, arialLabel }) => (
    <section className="button-more">
        <button
            type="button"
            className="button-more__button"
            onClick={onClick}
            aria-label={arialLabel}
        >
            {children}
        </button>
    </section>
);



export default ButtonMore;
