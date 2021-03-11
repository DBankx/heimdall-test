"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, avatar: `https://ui-avatars.com/api/?name=${userData.email}&rounded=true&bold=true&background=FCDADC&color=3D3373` }));
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email });
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const { cookieString, token } = this.createCookie(tokenData);
        return { cookieString, token, findUser };
    }
    async getCurrentLoggedInUser(userId) {
        const findUser = await this.users.findOne({ _id: userId }).select("-password");
        if (!findUser)
            throw new HttpException_1.default(404, `User not found`);
        return findUser;
    }
    // expires in is that way because of test not ideal for production env
    createToken(user) {
        const dataStoredInToken = { _id: user._id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 6400;
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    createCookie(tokenData) {
        return {
            cookieString: `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`,
            token: tokenData.token
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map