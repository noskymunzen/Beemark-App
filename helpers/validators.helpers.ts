export type ValidationResult = true | string;

/**
 * Validates if there is at least one element into array has a string (error message)
 * @param results validation results
 */
export const solveValidation = (results: ValidationResult[]) =>
  results.find((result) => typeof result === "string") || true;

/**
 * Checks if email is valid
 * @param email
 */
export const isEmail = (email: string) => {
  return (
    !!email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) || "Email is not valid"
  );
};

/**
 * Checks if values is not empty
 * @param value
 */
export const isRequired = (value: unknown) => !!value || "Required value";

/**
 * Checks if values is a string
 * @param value
 */
export const isString = (value: unknown) =>
  typeof value === "string" || "Value is not a text";

/**
 * Checks if the value has a minimum of characters
 * @param value
 * @param minimum
 * @param field
 */
export const isMin = (
  value: string | Array<any>,
  minimum: number,
  field: string
) =>
  value.length >= minimum || `${field} must contains a minimum of ${minimum}`;

/**
 * Checks if password is valid
 * @param password
 */
export const isPassword = (password = "") =>
  solveValidation([isMin(password, 8, "Password")]);

/**
 * Checks if two passwords matches
 * @param pass1
 * @param pass2
 * @returns
 */
export const isMatchPass = (pass1: string, pass2: string) =>
  pass1 === pass2 || "Passwords do not match";

/**
 * Checks if url is valid
 * @param url
 * @returns
 */
export const validUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url) || "URL is not valid.";
};
