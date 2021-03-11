"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing AuthController', () => {
    describe('POST /signup', () => {
        it('response should have the Create userData', () => {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };
            const authRoute = new auth_route_1.default();
            authRoute.authController.authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));
            authRoute.authController.authService.users.create = jest.fn().mockReturnValue(Object.assign({ _id: 0 }, userData));
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer()).post('/signup').send(userData);
        });
    });
    describe('POST /login', () => {
        it('response should have the Set-Cookie header with the Authorization token', async () => {
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };
            process.env.JWT_SECRET = 'jwt_secret';
            const authRoute = new auth_route_1.default();
            authRoute.authController.authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve({
                _id: 0,
                email: 'test@email.com',
                password: await bcrypt_1.default.hash(userData.password, 10),
            }));
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer())
                .post('/login')
                .send(userData)
                .expect('Set-Cookie', /^Authorization=.+/);
        });
    });
    describe('POST /logout', () => {
        it('logout Set-Cookie Authorization=; Max-age=0', () => {
            const authRoute = new auth_route_1.default();
            const app = new app_1.default([authRoute]);
            return supertest_1.default(app.getServer())
                .post('/logout')
                .expect('Set-Cookie', /^Authorization=\;/);
        });
    });
});
describe('Testing AuthService', () => {
    describe('when creating a cookie', () => {
        it('should return a string', () => {
            const tokenData = {
                token: '',
                expiresIn: 1,
            };
            const authService = new auth_service_1.default();
            expect(typeof authService.createCookie(tokenData)).toEqual('string');
        });
    });
    describe('when registering a user', () => {
        describe('if the email is already token', () => {
            it('should throw an error', async () => {
                const userData = {
                    email: 'test@email.com',
                    password: 'q1w2e3r4!',
                };
                const authService = new auth_service_1.default();
                authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(userData));
                await expect(authService.signup(userData)).rejects.toMatchObject(new HttpException_1.default(400, `User with email ${userData.email} already exists`));
            });
        });
        describe('if the email is not token', () => {
            it('should not throw an error', async () => {
                const userData = {
                    email: 'test@email.com',
                    password: 'q1w2e3r4!',
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const authService = new auth_service_1.default();
                authService.users.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));
                authService.users.create = jest.fn().mockReturnValue(Object.assign({ _id: 0 }, userData));
                await expect(authService.signup(userData)).resolves.toBeDefined();
            });
        });
    });
});
//# sourceMappingURL=auth.test.js.map