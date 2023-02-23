/**
 * Creates object with equal values for all passed keys
 * @param keys
 * @param value
 */
export const createEqualValueObject = <T>(keys: string[], value: unknown) =>
  keys.reduce((acc, fieldName) => ({ ...acc, [fieldName]: value }), {}) as T;
