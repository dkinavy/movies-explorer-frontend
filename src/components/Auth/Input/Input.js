import React from 'react';

import './Input.css';

const Input = ({
    id, title, type, placeholder, isError, required
}) => {

    // Для проверки если "что-то не так"
    // isError = true;


    return (
        <label
            htmlFor={id}
            className="input"
        >
            {title}
            <input
                type={type}
                className={`input__input ${isError ? 'input__input_error' : ''}`}
                id={id}
                pattern={type === 'email' ? '.+@.+\\.[a-z]{2,}$' : null}
                required={required}
                minLength={3}
                maxLength={20}
                placeholder={placeholder}
            />
            { isError && <span className="input__error">Что-то пошло не так...</span>}
        </label>
    );
};


export default Input;
