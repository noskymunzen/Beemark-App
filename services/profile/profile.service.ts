import { User } from "@/types";
import Axios from "axios";
import { UserData } from "./profile.types";

const instance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
  headers: {
    withCredentials: true,
    mode: "cors",
    credentials: "omit",
    referrerPolicy: "strict-origin-when-cross-origin",
  },
});

instance.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) {
    return config;
  }
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const putDataUser = (userData: UserData) => {
  return instance.put<User>("/", userData);
};

const $profile = {
  putDataUser,
};
export default $profile;
