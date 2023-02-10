import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, Dropdown} from "react-bootstrap";
import {deleteCategory, fetchCategories} from "../../../http/adminAPI";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const DeleteCategory = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [value, setValue] = useState('')

  useEffect(() => {
    fetchCategories().then(data => device.setCategories(data))
  }, [])

  const destroyCategory = () => {
    deleteCategory({name: device.selectedCategory.name}).then(data => {
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
          Видалити категорію
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={destroyCategory} >Видалити</Button>
        <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteCategory;