import { AuthError } from "./auth.enum";

export const AuthErrorMsg: { [key in AuthError]?: string } = {
  [AuthError.CredentialsUnmatch]: "Credentials does not match",
  [AuthError.EmailExists]: "The email has already been registered",
  [AuthError.EmailNotExist]: "Email not found",
};
