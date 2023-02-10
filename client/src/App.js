import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, useHistory} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(()=> {
  const {user} = useContext(Context)
  const[loading, setLoading] = useState(true)

  if (localStorage.getItem('token')) {
    useEffect(() => {
      check().then(data => {
        user.setUser(user)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
    }, [])
    if (loading) {
      return <Spinner animation={"grow"}/>
    }
  }

  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
