import React, {useEffect, useState,useContext} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {fetchUserInfo} from "../http/profileAPI";
import DisplayUserInfo from "../components/modals/display/DisplayUserInfo";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import {Context} from "../index";
import jwtDecode from "jwt-decode";
import {deleteDevice} from "../http/deviceAPI";
import {SHOP_ROUTE} from "../utils/consts";


const DevicePage = () => {
  const [displayUserInfoVisible, setDisplayUserInfoVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const {user} = useContext(Context)
  const history = useHistory()

  let userId
  let role
  if (user.isAuth){
    userId = jwtDecode(localStorage.getItem('token')).id;
    role = jwtDecode(localStorage.getItem('token')).role;
  }

  const destroyDevice = async () => {
    await deleteDevice(id)
    history.push(SHOP_ROUTE)
  }

  useEffect(  () => {
    async function fetchData(){
      const data = await fetchOneDevice(id)
      setDevice(data)
      const userData = await fetchUserInfo(data.userId)
      setUserInfo(userData)
    }
    fetchData()
  }, [])

  return (
    <Container className="mt-3">
      <Row className='d-flex  justify-content-around'>
        <Col md={4}>
          <h2 className="ml-4">{device.name}</h2>
          <Image width={250} height={250} src={process.env.REACT_APP_API_URL + device.img}/>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 200, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>Ціна: {device.price} грн.</h3>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={()=> setDisplayUserInfoVisible(true)}
            >
              Данні продавця
            </Button>
            { userId === userInfo.userId || role === 'ADMIN' ?
                <Button
                    color="red"
                    appearance="primary"
                    onClick={destroyDevice}
                >
                  Видалити оголошення
                </Button>
                :
                null
            }
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
      <DisplayUserInfo show={displayUserInfoVisible} onHide={()=> setDisplayUserInfoVisible(false)}/>
    </Container>
  );
};

export default DevicePage;