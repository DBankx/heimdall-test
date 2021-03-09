import {Router} from "express";
import BookController from "../controllers/book.controller";
import Route from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import {BookCreateDto} from "../dtos/books.dto";
import authMiddleware from "../middlewares/auth.middleware";

class BooksRoute implements Route {
  public path = "/books";
  public router = Router();
  public bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`, this.bookController.getAllBooks);
    this.router.get(`${this.path}/:bookId`, this.bookController.getBookById);
    this.router.post(`${this.path}`, validationMiddleware(BookCreateDto, "body"), this.bookController.createBook);
    this.router.put(`${this.path}/borrow/:bookId`, authMiddleware, this.bookController.borrowBook);
    this.router.put(`${this.path}/return/:bookId`, authMiddleware, this.bookController.returnBook);
  }
}

export default BooksRoute;
