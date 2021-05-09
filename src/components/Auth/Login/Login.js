import React from 'react';

import { useHistory } from 'react-router';

import Button from '../Button/Button';
import Fieldset from '../Fieldset/Fieldset';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Text from '../Text/Text';

const Login = () => {
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/movies');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Fieldset>
                <Input
                    title="E-mail"
                    placeholder="E-mail"
                    id="email"
                    type="email"
                    required
                />
                <Input
                    title="Пароль"
                    placeholder="Пароль"
                    type="password"
                    id="password"
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
