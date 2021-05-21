import "./Profile.css";
import React, { useState, useEffect, useContext } from "react";
import AuthWithForm from "../AuthWithForm";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CurrentUserContext from "./../../context/CurrentUserContext";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Form from "../Form/Form";

import Text from "../Text/Text";

function Profile({
  logOutHandler,
  changeUserInfo,
  editIsSuccess,
  editIsFailed,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(currentUser);
    changeUserInfo(name, email);
  };
  const {
    password,
    setName,
    setEmail,
    name,
    email,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = AuthWithForm();

  useEffect(() => {
    setName(currentUser.name);
    // setIsValid(true);
    resetForm();
    setName(name);
    setEmail(email);
  }, [currentUser, setName, setEmail]);

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <Form onSubmit={handleSubmit} novalidate>
        <Fieldset>
          <Input
            name="name"
            type="name"
            value={name}
            placeholder="Имя"
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
            placeholder="Почта"
            id="email"
            onChange={handleChange}
            required
          />
        </Fieldset>
        <div>
          {editIsSuccess && (
            <p className="profile__message-ok">Данные успешно изменены!</p>
          )}
          {editIsFailed && (
            <p className="profile__link">Ошибка при изменении данных</p>
          )}
          <button
            type="submit"
            className={
              isValid &&
              (name !== currentUser.name || email !== currentUser.email)
                ? "profile__button-save"
                : "profile__button-save profile__button-save_disabled"
            }
            disabled={
              (name === currentUser.name && email === currentUser.email) ||
              !isValid
            }
          >
            Редактировать
          </button>
          <Link
            to={"/signin"}
            className="profile__link"
            onClick={logOutHandler}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </Form>
    </main>
  );
}

export default Profile;
