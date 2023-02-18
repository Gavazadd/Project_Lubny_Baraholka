import React, {useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../../index";
import jwtDecode from "jwt-decode";
import {rewriteUserImg} from "../../../http/profileAPI";

const RewriteUserImage =  ({show, onHide}) => {
    const {user} = useContext(Context)

    let id
    if (user.isAuth){
        id = jwtDecode(localStorage.getItem('token')).id;
    }
    const [file, setFile] = useState(null)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProfileImg = () => {
        const formData = new FormData()
        formData.append('img', file)
        formData.append('userId', id)
        rewriteUserImg(formData).then(data => onHide())
        window.location.reload()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити фото профілю
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
                <Button variant="outline-success" onClick={addProfileImg} >Добавити</Button>
                <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RewriteUserImage;