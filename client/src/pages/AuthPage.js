import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AuthPage = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const history = useHistory()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      if (isLogin) {
        await login(email, password);
        user.setIsAuth(true)
        history.push(SHOP_ROUTE)
      } else {
        await registration(email, password);
        alert('Перевірте вашу почту та підтвердьте її!')
      }
      user.setUser(user)
    } catch (e) {
      alert(e.response.data.message)
    }

  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Уведіть ваш email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Уведіть ваш пароль..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Немає аккаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструватися!</NavLink>
              </div>
              :
              <div>
                Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійти!</NavLink>
              </div>
            }
            <Button
              variant={"outline-success"}
              onClick={click}
            >
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </Button>
          </Row>

        </Form>
      </Card>
    </Container>
  );
});

export default AuthPage;