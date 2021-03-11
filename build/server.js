"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const book_route_1 = __importDefault(require("./routes/book.route"));
validateEnv_1.default();
const app = new app_1.default([new index_route_1.default(), new users_route_1.default(), new auth_route_1.default(), new book_route_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map