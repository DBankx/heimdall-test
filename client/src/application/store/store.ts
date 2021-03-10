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
}

const storeContext = createContext(new AppStore());

export default storeContext;
