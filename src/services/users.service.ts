import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import {Book} from "../interfaces/books.interface";

class UserService {
  public users = userModel;

  // GET users borrowed book
  public async getBorrowedBook(userId: string): Promise<Book[]> {
    const user = await this.users.findById(userId).populate("borrowedBooks");
    if(!user) throw new HttpException(401, "You are unauthorized");

    return user.borrowedBooks;
  }
}

export default UserService;
