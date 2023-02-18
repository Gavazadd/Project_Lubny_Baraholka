import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchUserDevices} from "../http/deviceAPI";
import jwtDecode from "jwt-decode";


const ShopPage = observer(() => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    let userId

    if (user.isAuth){
        userId = jwtDecode(localStorage.getItem('token')).id;
    }

    useEffect(() => {
        fetchUserDevices(userId).then(data => {
            device.setDevices(data.rows)

        })
    },)
    return (
        <Container>
            <Row className="mt-2">
                <h1>
                    Ваші оголошення
                </h1>
                <Col md={9}>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    )
})

export default ShopPage;