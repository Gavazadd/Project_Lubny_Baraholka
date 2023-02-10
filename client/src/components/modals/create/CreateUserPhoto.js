import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createCategory} from "../../../http/adminAPI";

const CreateCategory = ({show, onHide}) => {
  const [file, setFile] = useState(null)

  // const addCategory = () => {
  //   createCategory({name: value}).then(data => {
  //     setValue('')
  //     onHide()
  //   })
  // }
  const selectFile = e => {
    setFile(e.target.files[0])
  }


  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Добавити фото
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            onChange={selectFile}
            type="file"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide} >Добавити</Button>
        <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;