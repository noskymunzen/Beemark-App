import { PasswordToken } from "@/types";
import Axios from "axios";
import {
  GetIsValidToken,
  PostLogin,
  PostRecover,
  PostSignup,
  ResetPassword,
} from "./auth.types";

const instance = Axios.create({
  baseURL: "http://127.0.1.1:4000/auth",
  headers: {
    withCredentials: true,
    mode: "cors",
    credentials: "omit",
    referrerPolicy: "strict-origin-when-cross-origin",
  },
});

const postSignup = (userData: PostSignup) => {
  return instance.post("/signup", userData);
};

const postLogin = (userData: PostLogin) => {
  return instance.post<{ token: string }>("/login", userData);
};

const postRecover = (userData: PostRecover) => {
  return instance.post<void>("/recover", userData);
};

const checkCodePass = (code: GetIsValidToken) => {
  return instance.get<PasswordToken>(`/token/${code.code}`);
};

const resetPassword = (payload: ResetPassword) => {
  return instance.post<void>(`/reset-password`, payload);
};

const getUserData = () => {
  const token = localStorage.getItem("token");
  return instance.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const $auth = {
  postSignup,
  postLogin,
  postRecover,
  checkCodePass,
  resetPassword,
  getUserData,
};
export default $auth;
