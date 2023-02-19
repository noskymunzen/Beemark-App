export interface Bookmark {
  _id?: string;
  url: string;
  title: string;
  excerpt: string;
  tags: string[];
  imageURL?: string;
}

export interface PasswordToken {
  _id: string;
  code: string;
  idUser: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
