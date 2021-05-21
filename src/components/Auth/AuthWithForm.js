import React, { useCallback } from "react";

export default function useFormWithValidation() {
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    //console.log(target.id);
    if (target.id == "password") {
      setPassword(event.target.value);
    }
    if (target.id == "email") {
      setEmail(event.target.value);
    }
    if (target.id == "name") {
      setName(event.target.value);
    }
    setIsValid(target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
      setEmail("");
      setName("");
    },
    [setErrors, setIsValid]
  );

  console.log(errors);

  return {
    handleChange,
    errors,
    isValid,
    resetForm,
    password,
    name,
    email,
    setEmail,
    setName,
    setIsValid,
  };
}
