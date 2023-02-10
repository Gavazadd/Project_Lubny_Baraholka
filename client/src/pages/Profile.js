import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {Context} from "../index";
import CreateUserInfo from "../components/modals/create/CreateUserInfo";
import CreateUserPhoto from "../components/modals/create/CreateUserPhoto";


const Profile = () => {
  const [createUserInfoVisible, setCreateUserInfoVisible] = useState(false)
  const [createUserPhotoVisible, setCreateUserPhotoVisible] = useState(false)
  const {user} = useContext(Context)
  let name = false

  if (user.isAuth){
    name = jwtDecode(localStorage.getItem('token')).email;
  }

  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col md={4}>
          <h2 className="ml-4"> Вітаємо вас, {name}</h2>
          <Image width={250} height={250} src={process.env.REACT_APP_API_URL + "img"}/>
        </Col>
      </Row>
      <Row className="pt-3 ml-1">
        <Button
          variant={"outline-dark"}
          className="mt-4 p-2"
          onClick={()=> setCreateUserPhotoVisible(true)}
        >
          Редагувати фото
        </Button>
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
      <CreateUserPhoto show={createUserPhotoVisible} onHide={()=> setCreateUserPhotoVisible(false)}/>
    </Container>
  );
};

export default Profile;