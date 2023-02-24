import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import jwtDecode from "jwt-decode";
import {fetchFavouriteDevices} from "../http/favouritesAPI";


const FavouritesPage = observer(() => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    let userId

    if (user.isAuth){
        userId = jwtDecode(localStorage.getItem('token')).id;
    }

    useEffect(() => {
        fetchFavouriteDevices(userId).then(data => {
            device.setDevices(data)
        })
    },)

    return (
        <Container>
            <h1>
                Ваші обрані оголошення
            </h1>
            <Row className="mt-2">
                <Col md={9}>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    )
})

export default FavouritesPage;