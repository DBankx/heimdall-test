"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class UsersRoute {
    constructor() {
        this.path = '/api/users';
        this.router = express_1.Router();
        this.usersController = new users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/books`, auth_middleware_1.default, this.usersController.getUserBorrowedBooks);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=users.route.js.map