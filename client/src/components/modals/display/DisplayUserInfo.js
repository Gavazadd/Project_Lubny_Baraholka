import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../../../http/deviceAPI";
import {fetchUserInfo} from "../../../http/profileAPI";

const DisplayUserInfo = ({show, onHide}) => {
  const [userInfo, setUserInfo] = useState({additional_info: []})
  const {id} = useParams()


  useEffect(  () => {
    async function fetchData(){
    const data = await fetchOneDevice(id)
    const userData = await fetchUserInfo(data.userId)
    setUserInfo(userData)
  }
  fetchData()
  }, [])

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Дані продавця
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h5>
              Головна інформація
            </h5>
            <Col style={{padding: 10}}>
              Ім'я: {userInfo.name}
            </Col>
            <Col style={{padding: 10}}>
              Номер телефону: +380{userInfo.phone}
            </Col>
            <h5 style={{padding: 10}} >
              Додаткова інформація
            </h5>
            {userInfo.additional_info.map((info, index) =>
              <Col key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                {info.title}: {info.description}
              </Col>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayUserInfo;