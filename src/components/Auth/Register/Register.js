import React from "react";

import { useHistory } from "react-router";

import Button from "../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Link from "../Link/Link";
import Text from "../Text/Text";
import AuthWithForm from "../AuthWithForm";

function Register({ onRegister, onError, onClearMessages }) {
    //const history = useHistory();
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    // const [name, setName] = React.useState("");

    const { password, name, email, errors, isValid, handleChange } = AuthWithForm();
    //if (onError) errors.password = onError;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(name, " fvbfdbvfbd", email, password);
        onRegister(name, email, password);
    };

    return (
        <Form onSubmit={handleSubmit} novalidate>
            <Fieldset>
                <Input
                    title="Имя"
                    placeholder="Имя"
                    id="name"
                    type="name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={30}
                    value={name}
                    onChange={handleChange}
                    isError={errors.name}
                    onFocus={onClearMessages}
                />
                <Input
                    title="E-mail"
                    placeholder="E-mail"
                    id="email"
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={email}
                    isError={errors.email}
                    onFocus={onClearMessages}
                />
                <Input
                    title="Пароль"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={handleChange}
                    isError={errors.password}
                    onError={onError}
                    onFocus={onClearMessages}
                />
            </Fieldset>
            <div>
                <Button type="submit">Зарегистрироваться</Button>
                <Text>
                    Уже зарегистрированы? <Link to="/signin" name="Войти" />
                </Text>
            </div>
        </Form>
    );
}

export default Register;
