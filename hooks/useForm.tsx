import { createEqualValueObject } from "@/helpers/equalObject.helpers";
import { useState } from "react";

export interface useFormProps<T> {
  initialValues: Partial<T>;
  validate: (values: Partial<T>) => { [key in keyof T]?: string | boolean };
  onSubmit: (values: T) => void | Promise<void>;
}

const useForm = <T extends object>({
  initialValues,
  validate,
  onSubmit,
}: useFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues as T);
  const initialErrors = createEqualValueObject<Record<keyof T, boolean>>(
    Object.keys(initialValues),
    false
  );
  const initialTouched = createEqualValueObject<Record<keyof T, boolean>>(
    Object.keys(initialValues),
    false
  );
  const [touched, setTouched] =
    useState<Record<keyof T, boolean>>(initialTouched);

  const setField = (field: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const touchField = (field: keyof T) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  const errors: Record<keyof T, boolean> = {
    ...initialErrors,
    ...Object.entries(validate(values)).reduce(
      (acc, [field, value]) => ({
        ...acc,
        [field]: typeof value === "string" ? value : false,
      }),
      {} as Record<keyof T, boolean>
    ),
  };
  const hasErrors = Object.values(errors).some(
    (value) => typeof value === "string"
  );

  const submit = () => {
    if (hasErrors) {
      setTouched(createEqualValueObject(Object.keys(initialValues), true));

      return;
    }
    onSubmit(values as T);
  };

  return {
    values,
    setField,
    errors,
    touched,
    touchField,
    hasErrors,
    submit,
    setValues,
  };
};
export default useForm;
