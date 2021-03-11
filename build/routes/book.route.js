"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const books_dto_1 = require("../dtos/books.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class BooksRoute {
    constructor() {
        this.path = "/books";
        this.router = express_1.Router();
        this.bookController = new book_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.bookController.getAllBooks);
        this.router.get(`${this.path}/:bookId`, this.bookController.getBookById);
        this.router.post(`${this.path}`, validation_middleware_1.default(books_dto_1.BookCreateDto, "body"), this.bookController.createBook);
        this.router.put(`${this.path}/borrow/:bookId`, auth_middleware_1.default, this.bookController.borrowBook);
        this.router.put(`${this.path}/return/:bookId`, auth_middleware_1.default, this.bookController.returnBook);
    }
}
exports.default = BooksRoute;
//# sourceMappingURL=book.route.js.map