import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post('/api/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.get('/api/user', authMiddleware, this.authController.getCurrentLoggedInUser);
    this.router.post('/api/logout', authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
