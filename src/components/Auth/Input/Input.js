import React from "react";

import "./Input.css";

const Input = ({
  id,
  title,
  type,
  name,
  placeholder,
  isError,
  onError,
  required,
  onChange,
  onFocus,
}) => {
  // Для проверки если "что-то не так"
  //isError = true;

  return (
    <label htmlFor={id} className="input">
      {title}
      <input
        type={type}
        className={`input__input ${isError ? "input__input_error" : ""}
        }`}
        id={id}
        pattern={type === "email" ? ".+@.+\\.[a-z]{2,}$" : null}
        required={required}
        minLength={3}
        maxLength={20}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        name={name}
      />
      {isError && <span className="input__error">{isError}</span>}
      {onError && <span className="input__error">{onError}</span>}
    </label>
  );
};

export default Input;
