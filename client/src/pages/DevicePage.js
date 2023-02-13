import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {fetchUserInfo} from "../http/profileAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const [userInfo, setUserInfo] = useState({additional_info: []})
  const {id} = useParams()


  useEffect( async () => {
    const data = await fetchOneDevice(id)
    setDevice(data)
    const userData = await fetchUserInfo(data.userId)
    setUserInfo(userData)
  }, [])

  console.log(userInfo)

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <h2 className="ml-4">{device.name}</h2>
          <Image width={250} height={250} src={process.env.REACT_APP_API_URL + device.img}/>
        </Col>
        <Col md={4}>
          <Row>
            <h2>Данні продавця:</h2>
            <Row>
              <Col>
                <Col style={{background: 'lightgray', padding: 10}}>
                  Ім'я: {userInfo.name}
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
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>Ціна: {device.price} грн.</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
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
    </Container>
  );
};

export default DevicePage;