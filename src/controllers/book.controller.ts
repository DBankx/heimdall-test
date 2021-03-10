import {NextFunction, Request, Response} from "express";
import {Book} from "../interfaces/books.interface";
import BookService from "../services/book.service";
import {BookCreateDto} from "../dtos/books.dto";
import {RequestWithUser} from "../interfaces/auth.interface";

class BookController {
  public bookService = new BookService();

  public getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    var title = req.query.title as string;
    try{
      const getAllBooks: Book[] = await this.bookService.getAllBooks(title);
      res.status(200).json({data: getAllBooks, message: "getAll"});
    }catch (error) {
     next(error);
    }
  }

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const bookId : string = req.params.bookId;

    try{
      const getOneBookData: Book = await this.bookService.getBookById(bookId);
      res.status(200).json({
        data: getOneBookData,
          message: "getBook"
      })
    } catch (error) {
      next(error);
    }
  }

  public createBook = async (req: Request, res: Response, next:NextFunction) => {
    const bookData: BookCreateDto = req.body;
    try{
      const bookCreatedData: Book = await this.bookService.createBook(bookData);
      res.status(201).json({data: bookCreatedData});
    } catch(error){
      next(error);
    }
  }

  public borrowBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId: string = req.user._id;
    const bookId: string = req.params.bookId;
    try{
      const message: string = await this.bookService.borrowBook(bookId, userId);
      res.status(200).json({data: message});
    }catch (error) {
     next(error)
    }
  }

  public returnBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   const userId: string = req.user._id;
   const bookId: string = req.params.bookId;
   try{
     const message: string = await this.bookService.returnBook(bookId, userId);
     res.status(200).json({data: message});
   }catch (error) {
    next(error);
   }
  }
}

export default BookController;
