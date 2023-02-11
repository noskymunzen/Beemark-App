interface PostSignin {
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

export type { PostSignin, PostLogin, PostRecover, GetIsValidToken };
