"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const books_model_1 = __importDefault(require("../models/books.model"));
const util_1 = require("../utils/util");
const users_model_1 = __importDefault(require("../models/users.model"));
class BookService {
    constructor() {
        this.books = books_model_1.default;
        this.users = users_model_1.default;
    }
    // GET all books in db
    async getAllBooks(title) {
        const books = await this.books.find({ "title": { $regex: util_1.isEmpty(title) ? "" : title, $options: "i" } });
        return books;
    }
    // GET book by id
    async getBookById(bookId) {
        const book = await this.books.findOne({ _id: bookId });
        if (!book)
            throw new HttpException_1.default(404, "Book not found");
        return book;
    }
    // POST book
    async createBook(bookData) {
        if (util_1.isEmpty(bookData))
            throw new HttpException_1.default(400, "Please give the required data to make a book");
        const createBook = await this.books.create(Object.assign({}, bookData));
        return createBook;
    }
    // PUT Borrow a copy of a book
    async borrowBook(bookId, userId) {
        // find user by id;
        const user = await this.users.findById(userId).select("-password");
        if (!user)
            throw new HttpException_1.default(401, "You are unauthorized");
        // find book by id;
        const book = await this.books.findById(bookId);
        if (!book)
            throw new HttpException_1.default(404, "Book not found");
        // Check if copies left are greater than 1
        if (book.copies <= 1) {
            throw new HttpException_1.default(400, "Book is unavailable");
        }
        // check if user has already borrowed book
        if (user.borrowedBooks.filter((book) => book._id.toString() === bookId).length > 0) {
            throw new HttpException_1.default(400, "You have already borrowed this book");
        }
        // check if user has borrowed more than two books
        if (user.borrowedBooks.length >= 2)
            throw new HttpException_1.default(400, "You have borrowed 2 books or more!. Kindly return one");
        // update the users borrowedBooks array to add the new book
        await this.users.findByIdAndUpdate(user._id, {
            $push: { borrowedBooks: book }
        });
        // remove one from the amount of copies in the library
        await this.books.findByIdAndUpdate(book._id, {
            copies: book.copies - 1
        });
        return "Borrow successful";
    }
    // PUT Return book
    async returnBook(bookId, userId) {
        const user = await this.users.findById(userId);
        if (!user)
            throw new HttpException_1.default(401, "You are unauthorized");
        const book = await this.books.findById(bookId);
        if (!book)
            throw new HttpException_1.default(404, "Book not found");
        // check if user has borrowed book
        if (user.borrowedBooks.filter((book) => book._id.toString() === bookId).length < 1)
            throw new HttpException_1.default(400, "You haven't borrowed this book yet");
        // remove the book from the users borrowed book
        await this.users.findByIdAndUpdate(userId, { $pull: { borrowedBooks: book._id } });
        // add the copy back to the library
        await this.books.findByIdAndUpdate(bookId, { copies: book.copies + 1 });
        return "Book successfully returned";
    }
}
exports.default = BookService;
//# sourceMappingURL=book.service.js.map