import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchOfferTypes} from "../../../http/adminAPI";
import {createDevice, fetchDevices} from "../../../http/deviceAPI";
import jwtDecode from "jwt-decode";

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const {user} = useContext(Context)

  let id
  if (user.isAuth){
    id = jwtDecode(localStorage.getItem('token')).id;
  }

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
    formData.append('userId', id)
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
          Створити оголошення
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{ device.selectedCategory.name || "Виберіть категорію"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.categories.map(category =>
                <Dropdown.Item
                  onClick={()=> device.setSelectedCategory(category)}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{ device.selectedOfferType.name || "Виберіть тип оголошення"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.offerTypes.map(offerType =>
                <Dropdown.Item
                  onClick={()=> device.setSelectedOfferType(offerType)}
                  key={offerType.id}
                >
                  {offerType.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            className="mt-3"
            onChange={e => setName(e.target.value)}
            placeholder="Уведіть назву вашого товару"
          />
          <Form.Control
            value={price}
            className="mt-3"
            onChange={e => setPrice(Number(e.target.value))}
            placeholder="Уведіть вартість вашого товару"
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
        <Button variant="outline-success" onClick={addDevice}>Добавити</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;