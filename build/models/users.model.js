"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    borrowedBooks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});
const userModel = mongoose_1.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=users.model.js.map