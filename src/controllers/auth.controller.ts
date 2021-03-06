import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookieString, token, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookieString]);
      res.status(200).json({ data: findUser, message: 'login', token });
    } catch (error) {
      next(error);
    }
  };


  public getCurrentLoggedInUser = async (req: RequestWithUser, res: Response, next:NextFunction) => {
    const userId: string = req.user._id;

    try{
      const userData: User = await this.authService.getCurrentLoggedInUser(userId);
      res.status(200).json({data: userData, message: "get user"})
    }catch (error){
      next(error);
    }
  }
}

export default AuthController;
