import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createCategory} from "../../../http/adminAPI";

const CreateCategory = ({show, onHide}) => {
  const [value, setValue] = useState('')

  const addCategory = () => {
    createCategory({name: value}).then(data => {
      setValue('')
      onHide()
    })
  }


  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Добавити категорію
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Уведіть назву категорії"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addCategory} >Добавити</Button>
        <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;