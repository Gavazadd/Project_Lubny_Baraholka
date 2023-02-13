import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {createUserInfo} from "../../../http/profileAPI";
import jwtDecode from "jwt-decode";

const CreateUserInfo = observer(({show, onHide}) => {
  const {user} = useContext(Context)

  let id
  if (user.isAuth){
    id = jwtDecode(localStorage.getItem('token')).id;
  }


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addProfileInfo = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('img', file)
    formData.append('userId', id)
    formData.append('info', JSON.stringify(info))
    createUserInfo(formData).then(data => onHide())
    user.setIsInfo(true)
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавити інформацію користувача
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            className="mt-3"
            onChange={e => setName(e.target.value)}
            placeholder="Уведіть ваше ім'я"
          />
          <Form.Control
            value={phone}
            className="mt-3"
            onChange={e => setPhone(Number(e.target.value))}
            placeholder="Уведіть ваш номер телефону"
            type="number"
          />
          <Form.Control
            className="mt-3"
            onChange={selectFile}
            type="file"
          />
          <hr/>
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Добавити характеристики
          </Button>
          {info.map(i =>
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Уведіть назву"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Уведіть опис"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Видалити
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProfileInfo}>Добавити</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateUserInfo;