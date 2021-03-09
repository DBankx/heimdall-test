import {Book} from "./books.interface";

export interface User {
  _id: string;
  email: string;
  password: string;
  borrowedBooks?: Book[];
  avatar: string;
}
