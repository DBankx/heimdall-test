import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Redirect, Route, RouteProps, RouteComponentProps} from "react-router-dom";
import storeContext from "../../application/store/store";

interface IProps extends RouteProps{
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({component:  Component, ...rest}) => {
  const {isLoggedIn} = useContext(storeContext);
  return (
    <Route {...rest} render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />} />
  )
}

export default observer(PrivateRoute);


