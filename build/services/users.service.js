"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
class UserService {
    constructor() {
        this.users = users_model_1.default;
    }
    // GET users borrowed book
    async getBorrowedBook(userId) {
        const user = await this.users.findById(userId).populate("borrowedBooks");
        if (!user)
            throw new HttpException_1.default(401, "You are unauthorized");
        return user.borrowedBooks;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map