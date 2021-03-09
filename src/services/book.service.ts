import HttpException from "../exceptions/HttpException";
import {Book} from "../interfaces/books.interface";
import bookModel from "../models/books.model";
import {BookCreateDto} from "../dtos/books.dto";
import {isEmpty} from "../utils/util";
import * as Http from "http";
import {User} from "../interfaces/users.interface";
import userModel from "../models/users.model";

class BookService {
  public books = bookModel;
  public users = userModel;

  // GET all books in db
  public async getAllBooks(): Promise<Book[]> {
    const books: Book[] = await this.books.find();
    return books;
  }

  // GET book by id
  public async getBookById(bookId: string): Promise<Book> {
    const book: Book = await this.books.findOne({_id: bookId});
    if (!book) throw new HttpException(404, "Book not found");

    return book;
  }

  // POST book
  public async createBook(bookData: BookCreateDto): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, "Please give the required data to make a book");

    const createBook: Book = await this.books.create({
      ...bookData
    });

    return createBook;
  }

  // PUT Borrow a copy of a book
  public async borrowBook(bookId: string, userId: string): Promise<string> {

    // find user by id;
    const user: User = await this.users.findById(userId).select("-password");

    if (!user) throw new HttpException(401, "You are unauthorized");

    // find book by id;
    const book: Book = await this.books.findById(bookId);

    if (!book) throw new HttpException(404, "Book not found");

    // Check if copies left are greater than 1
    if (book.copies <= 1) {
      throw new HttpException(400, "Book is unavailable")
    }

    // check if user has already borrowed book
    if (user.borrowedBooks.filter((book) => book._id.toString() === bookId).length > 0) {
      throw new HttpException(400, "You have already borrowed this book")
    }

    // check if user has borrowed more than two books
    if (user.borrowedBooks.length >= 2) throw new HttpException(400, "You have borrowed 2 books or more!. Kindly return one")

    // create a new borrow object with the book id
    let newBorrow = {
      _id: book._id
    }

    // update the users borrowedBooks array to add the new book
    await this.users.findByIdAndUpdate(user._id, {
      $push: {borrowedBooks: newBorrow}
    });

    // remove one from the amount of copies in the library
    await this.books.findByIdAndUpdate(book._id, {
      copies: book.copies - 1
    });

    return "Borrow successful";
  }

  // PUT Return book
  public async returnBook(bookId: string, userId: string) : Promise<string> {
    const user = await this.users.findById(userId);
    if(!user) throw new HttpException(401, "You are unauthorized");

    const book = await this.books.findById(bookId);
    if(!book) throw new HttpException(404, "Book not found");

    // check if user has borrowed book
    if(user.borrowedBooks.filter((book) => book._id.toString() === bookId).length < 1) throw new HttpException(400, "You haven't borrowed this book yet");

    // remove the book from the users borrowed book
    await this.users.findByIdAndUpdate(userId, {$pull: { borrowedBooks: {_id: book._id}}});

    // add the copy back to the library
    await this.books.findByIdAndUpdate(bookId, {copies: book.copies + 1});

    return "Book successfully returned";
  }

}

export default BookService;
