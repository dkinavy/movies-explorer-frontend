import React from 'react';

import { useHistory } from 'react-router';

import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Text from '../Text/Text';
import AuthWithForm from "../AuthWithForm";
function Login({ onLogin, onError, onClearMessages }) {
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
        //history.push('/movies');
    };
    const { errors, isValid, handleChange } = AuthWithForm();
    return (
        <Form onSubmit={handleSubmit}>
            <Fieldset>
                <Input
                    title="E-mail"
                    placeholder="E-mail"
                    id="email"
                    type="email"
                    required
                    isError={errors.email}
                    onFocus={onClearMessages}
                    value={email}
                    onChange={(evt) => {
                        setEmail(evt.target.value);
                    }}
                />
                <Input
                    title="Пароль"
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    isError={errors.password}
                    onError={onError}
                    onFocus={onClearMessages}
                    value={password}
                    onChange={(evt) => {
                        setPassword(evt.target.value);
                    }}
                    required
                />
            </Fieldset>
            <div>
                <Button>
                    Войти
        </Button>
                <Text>
                    Ещё не зарегистрированы?
          {' '}
                    <Link
                        to='/signup'
                        name="Регистрация"
                    />
                </Text>
            </div>
        </Form>
    );
};


export default Login;
