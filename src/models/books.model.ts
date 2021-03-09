import {model, Schema, Document} from "mongoose";
import {Book} from "../interfaces/books.interface";

const bookSchema : Schema = new Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true,
  },
  genre:{
    type: String,
    required: true
  },
  pages:{
    type: Number,
    required: true
  },
  images:{
    type: [String],
    required: true
  },
  copies:{
    type: Number,
    required: true
  },
  productLink:{
    type: String,
    required: true
  },
  publishedDate:{
    type: String,
    required: true
  }
});

const bookModel = model<Book & Document>("book", bookSchema);

export default bookModel;
