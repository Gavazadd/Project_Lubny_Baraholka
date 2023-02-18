import React, {useContext, useState} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createUserInfo} from "../../http/profileAPI";
import jwtDecode from "jwt-decode";
import {useHistory} from "react-router-dom";
import {PROFILE_Display_ROUTE} from "../../utils/consts";


const CreateUserInfo = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const history = useHistory()

    let id
    if (user.isAuth){
        id = jwtDecode(localStorage.getItem('token')).id;
    }

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
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


    const addProfileInfo = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('phone', phone)
            formData.append('userId', id)
            formData.append('info', JSON.stringify(info))
            await createUserInfo(formData)
            history.push(PROFILE_Display_ROUTE)
            window.location.reload()
        }catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container  className="d-flex  justify-content-center">
            <Col md={4}>
                <h3>
                    Заповніть ваш профіль
                </h3>
                <Form className= 'pb-3'>
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
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавити додаткову інформацію
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Назва"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Опис"
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
            <Button variant="outline-success" onClick={addProfileInfo}>Добавити</Button>
            </Col>
    </Container>)
});

export default CreateUserInfo;