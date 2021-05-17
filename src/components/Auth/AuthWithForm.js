import React, { useCallback } from "react";

export default function useFormWithValidation() {
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;

    setIsValid(target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const resetForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  console.log(errors);

  return {
    handleChange,
    errors,
    isValid,
    resetForm,

    setIsValid,
  };
}
