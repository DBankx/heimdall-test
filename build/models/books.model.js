"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    copies: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
});
const bookModel = mongoose_1.model("Book", bookSchema);
exports.default = bookModel;
//# sourceMappingURL=books.model.js.map