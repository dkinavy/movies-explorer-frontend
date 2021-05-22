import React from "react";

import { useHistory } from "react-router";

import Button from "../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Link from "../Link/Link";
import Text from "../Text/Text";
import AuthWithForm from "../AuthWithForm";

function Login({ onLogin, onError, onClearMessages }) {
  //   const history = useHistory();
  //   const [email, setEmail] = React.useState("");
  //   const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    //history.push('/movies');
  };
  const { password, name, email, errors, isValid, handleChange } =
    AuthWithForm();
  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Input
          title="E-mail"
          placeholder="E-mail"
          id="email"
          type="email"
          name="email"
          required
          isError={errors.email}
          onFocus={onClearMessages}
          value={email}
          onChange={handleChange}
        />
        <Input
          title="Пароль"
          placeholder="Пароль"
          type="password"
          id="password"
          name="password"
          isError={errors.password}
          onError={onError}
          onFocus={onClearMessages}
          value={password}
          onChange={handleChange}
          required
        />
      </Fieldset>
      <div>
        <Button isActive={isValid} type="submit">
          Войти
        </Button>
        <Text>
          Ещё не зарегистрированы? <Link to="/signup" name="Регистрация" />
        </Text>
      </div>
    </Form>
  );
}

export default Login;
