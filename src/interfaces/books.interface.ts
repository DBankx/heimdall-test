import {User} from "./users.interface";

export interface Book{
  _id: string;
  title?: string;
  author?: string;
  rating?: Number;
  description?: string;
  genre?: string;
  pages?: Number;
  images?: string[];
  copies?: number;
  publishedDate?: string;
  productLink?: string;
}
