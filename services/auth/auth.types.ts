interface PostSignup {
  name: string;
  email: string;
  password: string;
}

interface PostLogin {
  email: string;
  password: string;
}

interface PostRecover {
  email: string;
}

interface GetIsValidToken {
  code: string;
}

interface ResetPasswordForm {
  password: string;
  confirmPass: string;
}

interface ResetPassword {
  code: string;
  password: string;
}

export type {
  PostSignup,
  PostLogin,
  PostRecover,
  GetIsValidToken,
  ResetPassword,
  ResetPasswordForm,
};
