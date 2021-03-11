"use strict";
// SEEDER file to seed the books data into the database
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_seed_1 = __importDefault(require("mongoose-seed"));
const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
const db = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
mongoose_seed_1.default.connect(db, () => {
    mongoose_seed_1.default.loadModels([
        "../models/books.model"
    ]);
    mongoose_seed_1.default.clearModels(['Book']);
    mongoose_seed_1.default.populateModels(booksLibraryData, (err, done) => {
        if (err) {
            return console.log("Seed error occurred", err);
        }
        if (done) {
            return console.log("Seeded the books data", done);
        }
        mongoose_seed_1.default.disconnect();
    });
});
const booksLibraryData = [
    {
        "model": "Book",
        "documents": [
            {
                "_id": "5d725a4a7b292f5f8ceff789",
                "title": "Pride and Prejudice",
                "description": "Austen's finest comedy of manners portrays life in the genteel rural society of the early 1800s, and tells of the initial misunderstandings (and mutual enlightenment) between lively and quick witted Elizabeth Bennet and the haughty Mr. Darcy.",
                "pages": 311,
                "author": "Jane Austen",
                "copies": 10,
                "publishedDate": "28 January 1813",
                "genre": "Romance",
                "productLink": "https://www.google.com/imgres?imgurl=http%3A%2F%2Fprodimage.images-bn.com%2Fpimages%2F9781499369748_p0_v3_s1200x630.jpg&imgrefurl=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2Fpride-and-prejudice-jane-austen%2F1119466370&tbnid=NMx1emFWKesICM&vet=12ahUKEwix-dS1laPvAhVE_4UKHe7JDaMQMygJegUIARCgAQ..i&docid=otPXzRM2nFj7cM&w=419&h=630&q=pride%20and%20prejudice%20jane%20austen&ved=2ahUKEwix-dS1laPvAhVE_4UKHe7JDaMQMygJegUIARCgAQ",
                "images": ["http://prodimage.images-bn.com/pimages/9781499369748_p0_v3_s1200x630.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7Wjjym-OUdeUqOXmFz2a9qO9HW_mUiWdjw&usqp=CAU"],
                "rating": 4.6
            }
        ]
    }
];
//# sourceMappingURL=seeder.js.map