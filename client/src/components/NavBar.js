import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {
  ADMIN_ROUTE,
  CREATE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_Create_ROUTE,
  PROFILE_Display_ROUTE,
  SHOP_ROUTE
} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import jwtDecode from "jwt-decode";


const NavBar = observer(() => {
  const {user} = useContext(Context)

  let isUserInfo
  let role

  if (user.isAuth){
   role = jwtDecode(localStorage.getItem('token')).role;
   isUserInfo = jwtDecode(localStorage.getItem('token')).isUserInfo;
  }
  const history = useHistory()

  const logOut = async () => {
    localStorage.removeItem('token')
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Lubny_Baraholka</NavLink>
        {user.isAuth ?
          <Nav className="m-lg-1" style={{color: 'white'}}>
            { isUserInfo ?
                <div>
                  <Button
                      variant={"outline-light"}
                      onClick={() => history.push(PROFILE_Display_ROUTE)}
                  >
                    Профіль
                  </Button>
                  <Button
                      variant={"outline-light"}
                      onClick={() => history.push(CREATE_ROUTE)}
                      className="ml-2"
                  >
                    Створити оголошення
                  </Button>
                </div>
                :
                <div>
                  <Button
                      variant={"outline-light"}
                      onClick={() => history.push(PROFILE_Create_ROUTE)}
                  >
                    Профіль
                  </Button>
                  <Button
                  variant={"outline-light"}
                  onClick={() => history.push(PROFILE_Create_ROUTE)}
                  className="ml-2"
                  >
                  Створити оголошення
                  </Button>
                </div>
            }
            { role === 'ADMIN' ?
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADMIN_ROUTE)}
              className="ml-2"
            >
              Адмін панель
            </Button>
              :
              null
            }

            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Вийти
            </Button>
          </Nav>
          :
          <Nav className="m-lg-1" style={{color: 'white'}}>
            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
          </Nav>
        }
      </Container>
    </Navbar>

  );
});

export default NavBar;
