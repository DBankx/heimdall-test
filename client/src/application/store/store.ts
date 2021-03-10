import {runInAction, action, observable, makeAutoObservable, configure, computed} from "mobx";
import {IAuthFormValues, IUser} from "../../infrastructure/models/auth";
import {AuthRequest} from "../api/agent";
import {createContext} from "react";

// Ensure mobx always runs in action
configure({enforceActions: "always"});

class AppStore{
  constructor() {
    makeAutoObservable(this);
  }

  @observable user : IUser | null = null;
  @observable token: string | null = null;

  // check if a user is logged in
  @computed get isLoggedIn(){
    return !!this.user;
  }

  // login a user
  @action loginUser = async (values: IAuthFormValues) => {
    try{
      const user = await AuthRequest.login(values);
      runInAction(() => {
        this.user = user;
      })
    }catch (error){
      throw error;
    }
  }
}

const storeContext = createContext(new AppStore());

export default storeContext;
