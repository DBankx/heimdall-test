"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = __importDefault(require("../services/book.service"));
class BookController {
    constructor() {
        this.bookService = new book_service_1.default();
        this.getAllBooks = async (req, res, next) => {
            var title = req.query.title;
            try {
                const getAllBooks = await this.bookService.getAllBooks(title);
                res.status(200).json({ data: getAllBooks, message: "getAll" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getBookById = async (req, res, next) => {
            const bookId = req.params.bookId;
            try {
                const getOneBookData = await this.bookService.getBookById(bookId);
                res.status(200).json({
                    data: getOneBookData,
                    message: "getBook"
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.createBook = async (req, res, next) => {
            const bookData = req.body;
            try {
                const bookCreatedData = await this.bookService.createBook(bookData);
                res.status(201).json({ data: bookCreatedData });
            }
            catch (error) {
                next(error);
            }
        };
        this.borrowBook = async (req, res, next) => {
            const userId = req.user._id;
            const bookId = req.params.bookId;
            try {
                const message = await this.bookService.borrowBook(bookId, userId);
                res.status(200).json({ data: message });
            }
            catch (error) {
                next(error);
            }
        };
        this.returnBook = async (req, res, next) => {
            const userId = req.user._id;
            const bookId = req.params.bookId;
            try {
                const message = await this.bookService.returnBook(bookId, userId);
                res.status(200).json({ data: message });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = BookController;
//# sourceMappingURL=book.controller.js.map