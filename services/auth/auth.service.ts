import { PasswordToken } from "@/types";
import Axios from "axios";
import {
  GetIsValidToken,
  PostLogin,
  PostRecover,
  PostSignin,
} from "./auth.types";

const instance = Axios.create({
  baseURL: "http://192.168.1.108:4000/auth",
  headers: {
    withCredentials: true,
    mode: "cors",
    credentials: "omit",
    referrerPolicy: "strict-origin-when-cross-origin",
  },
});

const postSignin = (userData: PostSignin) => {
  return instance.post("/signup", userData);
};

const postLogin = (userData: PostLogin) => {
  return instance.post<{ token: string }>("/login", userData);
};

const postRecover = (userData: PostRecover) => {
  return instance.post<void>("/recover", userData);
};

const checkCodePass = (code: GetIsValidToken) => {
  return instance.get<PasswordToken>(`/token/${code}`);
};

const getUserData = () => {
  const token = localStorage.getItem("token");
  return instance.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const $auth = {
  postSignin,
  postLogin,
  postRecover,
  checkCodePass,
  getUserData,
};
export default $auth;
