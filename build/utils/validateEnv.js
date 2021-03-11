"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    envalid_1.cleanEnv(process.env, {
        NODE_ENV: envalid_1.str(),
        MONGO_HOST: envalid_1.str(),
        MONGO_PORT: envalid_1.str(),
        MONGO_DATABASE: envalid_1.str(),
        JWT_SECRET: envalid_1.str(),
    });
};
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map