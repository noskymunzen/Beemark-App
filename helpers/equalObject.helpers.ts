export const createEqualValueObject = <T>(keys: string[], value: unknown) =>
  keys.reduce((acc, fieldName) => ({ ...acc, [fieldName]: value }), {}) as T;
