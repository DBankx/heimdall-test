import React from 'react';
import {Switch, Route} from "react-router-dom";
import PrivateRoute from "../../infrastructure/utils/PrivateRoute";
import LoginForm from "../../features/auth/LoginForm";
import {extendTheme, ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "../../infrastructure/utils/chakraTheme";

const theme = extendTheme(chakraTheme);

function App() {
  return (
    <ChakraProvider theme={theme}>
    <div className="app">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </div>
    </ChakraProvider>
  );
}

export default App;
