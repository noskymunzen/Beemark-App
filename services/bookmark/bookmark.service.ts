import Axios from "axios";
import { Bookmark } from "./bookmark.types";

const instance = Axios.create({
  baseURL: "http://127.0.1.1:4000/bookmark",
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

const postCreateBookmark = (bookmark: Bookmark) => {
  return instance.post<Bookmark>("/", bookmark);
};

const getBookmark = (search?: string) => {
  const urlParams = new URLSearchParams();
  if (search) {
    urlParams.append("search", search);
  }
  return instance.get<Bookmark[]>(`?${urlParams}`);
};

const putBookmark = (id: string, bookmark: Bookmark) => {
  return instance.put<Bookmark>(`/${id}`, bookmark);
};

const deleteBookmark = (id: string) => {
  return instance.delete<void>(`/${id}`);
};

const $bookmark = {
  postCreateBookmark,
  getBookmark,
  putBookmark,
  deleteBookmark,
};
export default $bookmark;
