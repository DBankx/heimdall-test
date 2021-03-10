import React, {useContext, useEffect} from 'react';
import {Switch, Route, useLocation} from "react-router-dom";
import PrivateRoute from "../../infrastructure/utils/PrivateRoute";
import LoginForm from "../../features/auth/LoginForm";
import {extendTheme, ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "../../infrastructure/utils/chakraTheme";
import Navbar from "../../features/nav/Navbar";
import HomePage from "../../features/home/HomePage";
import storeContext from "../store/store";
import Loader from "./Spinner";
import {observer} from "mobx-react-lite";
import BorrowedBooks from "../../features/auth/BorrowedBooks";
import BookPage from "../../features/book/BookPage";
import SignUpForm from "../../features/auth/SignUpForm";

const theme = extendTheme(chakraTheme);

function App() {
  const {loadApp, getCurrentUser, token, appLoaded} = useContext(storeContext);
  useEffect(() => {
    if(token){
      getCurrentUser().then(() => loadApp());
    }
    loadApp();
  }, [token, getCurrentUser, loadApp]);

  const {pathname} = useLocation();

  if(!appLoaded) return <Loader />;
  return (
    <ChakraProvider theme={theme}>
    <div className="app">
      {pathname !== "/signin" && pathname !== "/login" && <Navbar />}
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/book/:id" component={BookPage} />
        <Route exact path="/borrowed" component={BorrowedBooks} />
        <Route exact path="/signup" component={SignUpForm}/>
      </Switch>
    </div>
    </ChakraProvider>
  );
}

export default observer(App);
