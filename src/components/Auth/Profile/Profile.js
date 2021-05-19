import './Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthWithForm from "../AuthWithForm";
import { useHistory, } from 'react-router';
import { Link, } from 'react-router-dom';
import CurrentUserContext from './../../context/CurrentUserContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';


import Text from '../Text/Text';


function Profile({
    logOutHandler, changeUserInfo, editIsSuccess, editIsFailed,
}) {

    const currentUser = React.useContext(CurrentUserContext);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(name, " fvbfdbvfbd", email, password);
        changeUserInfo(name, email);
    };


    const { password, name, email, errors, isValid, handleChange } = AuthWithForm();

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <Form onSubmit={handleSubmit} novalidate>
                <Fieldset >

                    <Input
                        name="name"
                        type="name"
                        value={name}
                        placeholder={currentUser.name}
                        className="profile__input"
                        id="name"
                        isError={errors.name}
                        required

                        onChange={handleChange}

                    />


                    <Input
                        name="email"
                        title="E-mail"
                        type="email"
                        className="profile__input"
                        pattern=".+@.+\.[a-z]{2,}$"
                        value={email}
                        isError={errors.email}
                        placeholder={currentUser.email}
                        id="email"
                        onChange={handleChange}
                        required

                    />


                </Fieldset>
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
                        onClick={logOutHandler}
                    >
                        Выйти из аккаунта
          </Link>
                </div>
            </Form>
        </main>
    );
};

export default Profile;
