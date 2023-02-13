import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import DisplayUserInfo from "../components/modals/display/DisplayUserInfo";

const DevicePage = () => {
  const [displayUserInfoVisible, setDisplayUserInfoVisible] = useState(false)
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()


  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
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
            style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>Ціна: {device.price} грн.</h3>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={()=> setDisplayUserInfoVisible(true)}
            >
              Данні продавця
            </Button>
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