import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchOfferTypes} from "../../../http/adminAPI";
import {createDevice, fetchDevices} from "../../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchCategories().then(data => device.setCategories(data))
    fetchOfferTypes().then(data => device.setOfferTypes(data))
  }, [])

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

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('img', file)
    formData.append('categoryId', device.selectedCategory.id)
    formData.append('offerTypeId', device.selectedOfferType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавитити інформацію про себе
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
          <Row>
            <Col md={4}>
              <Form.Control
                className="mt-3"
                placeholder="+380"
              />
            </Col>
            <Col md={4}>
              <Form.Control
                value={price}
                className="mt-3"
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Уведіть ваш номер телефону"
                type="number"
              />
            </Col>
          </Row>
          <hr/>
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {info.map(i =>
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;