import { NextFunction, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userService from '../services/users.service';
import {Book} from "../interfaces/books.interface";
import {RequestWithUser} from "../interfaces/auth.interface";

class UsersController {
  public userService = new userService();

  public getUserBorrowedBooks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userBooks: Book[] = await this.userService.getBorrowedBook(req.user._id);
      res.status(200).json({ data: userBooks, message: 'get user books' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
