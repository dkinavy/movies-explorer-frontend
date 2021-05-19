import './Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { useHistory, } from 'react-router';
import { Link, } from 'react-router-dom';
import CurrentUserContext from './../../context/CurrentUserContext';


function Profile({
    logOutHandler, changeUserInfo, editIsSuccess, editIsFailed,
}) {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser)
    const {
        values,
        setValues,
        resetForm,
        handleChange,
        errors,
        isValid,
        setIsValid,
    } = useFormWithValidation();


    useEffect(() => {
        setValues(currentUser);

    }, [currentUser, setValues]);

    const submitHandler = (e) => {
        e.preventDefault();
        changeUserInfo(values);
    };

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={submitHandler}>
                <fieldset className="profile__fieldset">
                    <label htmlFor="name" className="profile__label">
                        Имя
            <input
                            type="text"
                            value={values.name}
                            placeholder="Имя"
                            className="profile__input"
                            id="name"
                            // onChange={handleChange}
                            size="3"
                            required
                            minLength="2"
                            maxLength="30"
                        />
                    </label>

                    <label htmlFor="email" className="profile__label">
                        Почта
            <input
                            type="email"
                            className="profile__input"
                            pattern=".+@.+\.[a-z]{2,}$"
                            value={values.email}
                            placeholder="E-Mail"
                            id="email"
                            // onChange={handleChange}
                            size="3"
                            required
                            minLength="2"
                            maxLength="30"
                        />
                    </label>
                    <span className="profile__input-error">
                        {errors.email}
                    </span>
                </fieldset>
                <div>
                    <button
                        type="submit"
                        className="profile__button-save"
                    >
                        Редактировать
          </button>
                    <Link
                        to={'/signin'}
                        className="profile__link"
                    >
                        Выйти из аккаунта
          </Link>
                </div>
            </form>
        </main>
    );
};

export default Profile;
