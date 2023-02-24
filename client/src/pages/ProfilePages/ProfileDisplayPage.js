import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {Context} from "../../index";
import RewriteUserInfo from "../../components/modals/rewrite/RewriteUserInfo";
import CreateUserImage from "../../components/modals/rewrite/RewriteUserImage";
import {fetchUserImg, fetchUserInfo} from "../../http/profileAPI";
import {FAVOURITES_ROUTE, USER_DEVICES_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";


const ProfileDisplayPage = () => {
  const [userInfo, setUserInfo] = useState({additional_info: []})
  const [userImg, setUserImg] = useState()
  const {user} = useContext(Context)
  const history = useHistory()
  let name
  let id

  if (user.isAuth){
    name = jwtDecode(localStorage.getItem('token')).email;
    id = jwtDecode(localStorage.getItem('token')).id;
  }

  useEffect( () => {
    async function fetchData(){
    const image = await fetchUserImg(id)
    setUserImg(image.img)
    const data = await fetchUserInfo(id)
    setUserInfo(data)
    }
    fetchData()
  }, [])

  const [createUserInfoVisible, setCreateUserInfoVisible] = useState(false)
  const [createUserImageVisible, setCreateUserImageVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col md={4}>
          <h2 className="ml-1"> Вітаємо вас, {userInfo.name}</h2>
          { userImg ?
              <Image  width={300} height={350} src={process.env.REACT_APP_API_URL + userImg}/>
              :
              <Image  width={300} height={300} src="images/user.jpg"/>
          }
        </Col>
        <Col className="ml-3">
        <h1>Ваша інформація</h1>
        <Col style={{background: 'lightgray', padding: 10}}>
          Пошта: {name}
        </Col>
        <Col style={{background: 'transparent', padding: 10}}>
          Номер телефону: +380{userInfo.phone}
        </Col>
        {userInfo.additional_info.map((info, index) =>
          <Col key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Col>
        )}
          <Col>
          <Button
              variant={"outline-dark"}
              onClick={() => history.push(USER_DEVICES_ROUTE)}
              className="mt-5"
          >
            Переглянути ваші оголошення
          </Button>
          </Col>
          <Col>
          <Button
              variant={"outline-dark"}
              onClick={() => history.push(FAVOURITES_ROUTE)}
              className="mt-4"
          >
            Переглянути ваші обрані
          </Button>
          </Col>
        </Col>
      </Row>
      <Row className="pt-1 ml-1">
        <Button
            variant={"outline-dark"}
            className="mt-4 ml-3 "
            onClick={()=> setCreateUserImageVisible(true)}
        >
          Редагувати фото
        </Button>
      </Row>
      <Row className="pt-1 ml-1">
        <Button
          variant={"outline-dark"}
          className="mt-4 ml-3 "
          onClick={()=> setCreateUserInfoVisible(true)}
        >
          Редагувати інформацію
        </Button>
      </Row>
      <RewriteUserInfo show={createUserInfoVisible} onHide={()=> setCreateUserInfoVisible(false)}/>
      <CreateUserImage show={createUserImageVisible} onHide={()=> setCreateUserImageVisible(false)}/>
    </Container>
  );
};

export default ProfileDisplayPage;