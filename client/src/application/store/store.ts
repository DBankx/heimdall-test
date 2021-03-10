import {runInAction, action, observable, makeAutoObservable, configure, computed, reaction} from "mobx";
import {IAuthFormValues, IUser} from "../../infrastructure/models/auth";
import {AuthRequest, BookRequest} from "../api/agent";
import {createContext} from "react";
import {IBook} from "../../infrastructure/models/book";

// Ensure mobx always runs in action
configure({enforceActions: "always"});

class AppStore{
  constructor() {
    makeAutoObservable(this);
    reaction(() => this.token, (token) => {
      if(token){
        // set the token value in local storage as soon as the token changes
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    })
  }

  @observable user : IUser | null = null;
  @observable token: string | null = localStorage.getItem("token");
  @observable appLoaded = false;
  @observable books: IBook[] | null = null;
  @observable loadingBooks = false;
  @observable book: IBook | null = null;
  @observable loadingBook = false;
  @observable loadingBookAction = false;

  // check if a user is logged in
  @computed get isLoggedIn(){
    return !!this.user;
  }

  // login a user
  @action loginUser = async (values: IAuthFormValues) => {
    try{
      const user = await AuthRequest.login(values);
      runInAction(() => {
        this.user = user.data;
        localStorage.setItem("token", user.token);
        this.appLoaded = true;
      })
    }catch (error){
      throw error;
    }
  }

  @action loadApp = () => {
    this.appLoaded = true;
  }

  @action getCurrentUser = async () => {
    try{
      const user = await AuthRequest.getCurrentUser();
      runInAction(() => {
        this.user = user.data;
        this.loadApp();
      })
    }catch (error) {
     throw error;
    }
  }

  @action getAllBooks = async () => {
    this.loadingBooks = true;
    try{
      const bookData = await BookRequest.getAllBooks();
      runInAction(() => {
        this.books = bookData.data;
        this.loadingBooks = false;
      })
    }catch (e) {
      runInAction(() => this.loadingBooks = false);
     throw e;
    }
  }

  @action getBookById = async (bookId: string) => {
    this.loadingBook = true;
    try{
      const bookData = await BookRequest.getBookById(bookId);
      runInAction(() => {
        this.book = bookData.data;
        this.book!.isBorrowed = this.user!.borrowedBooks.find(x => x._id === bookId) !== undefined;
        this.loadingBook = false;
      })
    }catch (error){
      runInAction(() => this.loadingBook = false);
      throw error;
    }
  }

  @action borrowBook = async (bookId: string) => {
    this.loadingBookAction = true;
    try{
      await BookRequest.borrowBook(bookId);
      runInAction(() => {
        const bookBeingBorrowed = this.books?.find(x => x._id === bookId);
        if(this.books !== null){
          const bookBeingBorrowed = this.books.find(x => x._id === bookId);
          if(bookBeingBorrowed){
            bookBeingBorrowed.isBorrowed = true;
            bookBeingBorrowed.copies = bookBeingBorrowed.copies - 1;
          }
        }
        if(this.book !== null){
          this.book.isBorrowed = true;
          this.book.copies = this.book.copies - 1;
        }
        this.user!.borrowedBooks.push(bookBeingBorrowed!);
        this.loadingBookAction = false;
      })
    }catch (error) {
      runInAction(() => this.loadingBookAction = false);
      throw error;
    }
  }

  @action returnBook = async (bookId: string) => {
    this.loadingBookAction = true;
    try{
      await BookRequest.returnBook(bookId);
      runInAction(() => {
        if(this.books !== null){
          const bookBeingReturned = this.books.find(x => x._id === bookId);
          if(bookBeingReturned){
            bookBeingReturned.isBorrowed = false;
            bookBeingReturned.copies = bookBeingReturned.copies + 1;
          }
        }
        if(this.book !== null){
          this.book.isBorrowed = false;
          this.book.copies = this.book.copies + 1;
        }
        this.user!.borrowedBooks = this.user!.borrowedBooks.filter(x => x._id !== bookId);
        this.loadingBookAction = false;
      })
    }catch (error) {
      runInAction(() => this.loadingBookAction = false);
      throw error;
    }
  }
}

const storeContext = createContext(new AppStore());

export default storeContext;
