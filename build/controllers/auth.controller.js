"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.signUp = async (req, res, next) => {
            const userData = req.body;
            try {
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({ data: signUpUserData, message: 'signup' });
            }
            catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next) => {
            const userData = req.body;
            try {
                const { cookieString, token, findUser } = await this.authService.login(userData);
                res.setHeader('Set-Cookie', [cookieString]);
                res.status(200).json({ data: findUser, message: 'login', token });
            }
            catch (error) {
                next(error);
            }
        };
        this.getCurrentLoggedInUser = async (req, res, next) => {
            const userId = req.user._id;
            try {
                const userData = await this.authService.getCurrentLoggedInUser(userId);
                res.status(200).json({ data: userData, message: "get user" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map