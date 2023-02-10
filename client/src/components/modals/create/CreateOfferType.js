import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createOfferType} from "../../../http/adminAPI";

  const CreateOfferType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addOfferType = () => {
      createOfferType({name: value}).then(data => {
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
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавити тип оголошення
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Уведіть назву оголошення"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addOfferType}>Добавити</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOfferType;