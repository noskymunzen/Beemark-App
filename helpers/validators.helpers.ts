export type ValidationResult = true | string;

export const solveValidation = (results: ValidationResult[]) =>
  results.find((result) => typeof result === "string") || true;

export const isEmail = (email: string) => {
  return (
    !!email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) || "Email is not valid"
  );
};

export const isRequired = (value: unknown) => !!value || "Required value";

export const isString = (value: unknown) =>
  typeof value === "string" || "Value is not a text";

export const isMin = (
  value: string | Array<any>,
  minimum: number,
  field: string
) =>
  value.length >= minimum || `${field} must contains a minimum of ${minimum}`;

export const isPassword = (value: string) =>
  solveValidation([isMin(value, 8, "Password")]);

export const validUrl = (value: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(value) || "Url is not valid.";
};
