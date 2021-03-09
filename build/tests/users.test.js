"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const users_route_1 = __importDefault(require("../routes/users.route"));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
describe('Testing Users', () => {
    describe('GET /users', () => {
        it('response All Users', () => {
            const usersRoute = new users_route_1.default();
            usersRoute.usersController.userService.users.find = jest.fn().mockReturnValue(Promise.resolve([
                {
                    email: 'example@gmail.com',
                    password: 'q1w2e3r4!',
                },
            ]));
            mongoose_1.default.connect = jest.fn();
            const app = new app_1.default([usersRoute]);
            return supertest_1.default(app.getServer()).get(`${usersRoute.path}`).expect(200);
        });
    });
});
//# sourceMappingURL=users.test.js.map