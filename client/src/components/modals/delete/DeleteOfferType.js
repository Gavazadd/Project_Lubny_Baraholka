import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, Dropdown} from "react-bootstrap";
import {deleteOfferType, fetchCategories, fetchOfferTypes} from "../../../http/adminAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const DeleteOfferType = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [value, setValue] = useState('')

  useEffect(() => {
    fetchOfferTypes().then(data => device.setOfferTypes(data))
  }, [])

  const destroyOfferType = () => {
    deleteOfferType({name: device.selectedOfferType.name}).then(data => {
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
          Видалити тип оголошення
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={destroyOfferType} >Видалити</Button>
        <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteOfferType;