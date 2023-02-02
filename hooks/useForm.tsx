import { useState } from "react";

const useForm = ({
  initialValues,
  validate = () => {},
  onSubmit = () => null,
}) => {
  const [values, setValues] = useState(initialValues);
  const initialErrors = Object.keys(initialValues).reduce((acc, fieldName) => {
    return { ...acc, [fieldName]: false };
  }, {});
  const initialTouched = Object.keys(initialValues).reduce((acc, fieldName) => {
    return { ...acc, [fieldName]: false };
  }, {});
  const [touched, setTouched] = useState(initialTouched);

  const setField = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const touchField = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };
  const errors = {
    ...initialErrors,
    ...validate(values),
  };
  const hasErrors = Object.values(errors).some(
    (value) => typeof value === "string"
  );

  const submit = () => {
    if (hasErrors) {
      return;
    }
    onSubmit(values);
  };

  return {
    values,
    setField,
    errors,
    touched,
    touchField,
    hasErrors,
    submit,
  };
};
export default useForm;
