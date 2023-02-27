import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes, isInfoRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";

const AppRouter = observer(() => {
  const {user} = useContext(Context)
  let role
  let isUserInfo
  if (user.isAuth){
    role = jwtDecode(localStorage.getItem('token')).role;
    isUserInfo = jwtDecode(localStorage.getItem('token')).isUserInfo;
  }

  console.log(isUserInfo === true)

  return (
    <Switch>
      {(role === "ADMIN") && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      {(isUserInfo === true) && isInfoRoutes.map(({path, Component}) =>
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