import React, {useContext} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  const history = useHistory()
  let role = false

  if (user.isAuth){
    role = jwtDecode(localStorage.getItem('token')).role;
  }else {
    history.push(SHOP_ROUTE)
  }


  return (
    <Switch>
      {(role === "ADMIN") && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      {user.isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      <Redirect to={SHOP_ROUTE}/>
    </Switch>
  );
});

export default AppRouter;