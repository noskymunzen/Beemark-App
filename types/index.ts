export interface Bookmark {
  _id?: string;
  url: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export interface PasswordToken {
  _id: string;
  code: string;
  idUser: string;
}
