import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {Context} from "../index";
import CreateUserInfo from "../components/modals/create/CreateUserInfo";
import {fetchUserInfo} from "../http/profileAPI";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({additional_info: []})
  const {user} = useContext(Context)
  let name
  let id

  if (user.isAuth){
    name = jwtDecode(localStorage.getItem('token')).email;
    id = jwtDecode(localStorage.getItem('token')).id;
  }

  useEffect(() => {
    fetchUserInfo(id).then(data => setUserInfo(data))
  }, [])

  const [createUserInfoVisible, setCreateUserInfoVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col md={4}>
          <h2 className="ml-1"> Вітаємо вас, {userInfo.name} !</h2>
          <Image className="ml-4" width={250} height={250} src={process.env.REACT_APP_API_URL + userInfo.img}/>
        </Col>
        <Col>
        <h1>Ваша інформація</h1>
        <Col style={{background: 'lightgray', padding: 10}}>
          Пошта: {name}
        </Col>
        <Col style={{background: 'transparent', padding: 10}}>
          Номер телефону: {userInfo.phone}
        </Col>
        {userInfo.additional_info.map((info, index) =>
          <Col key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Col>
        )}
        </Col>
      </Row>
      <Row className="pt-1 ml-1">
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={()=> setCreateUserInfoVisible(true)}
        >
          Редагувати інформацію
        </Button>
      </Row>
      <CreateUserInfo show={createUserInfoVisible} onHide={()=> setCreateUserInfoVisible(false)}/>
    </Container>
  );
};

export default ProfilePage;