import React, {useEffect, useState,useContext} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import {createUserInfo, fetchUserInfo} from "../http/profileAPI";
import DisplayUserInfo from "../components/modals/display/DisplayUserInfo";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import {Context} from "../index";
import jwtDecode from "jwt-decode";
import {deleteDevice} from "../http/deviceAPI";
import {SHOP_ROUTE} from "../utils/consts";
import {AddToFavourite, deleteFavouriteDevice, fetchOneFavourite} from "../http/favouritesAPI";


const DevicePage = () => {
  const [displayUserInfoVisible, setDisplayUserInfoVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [isFavourite, setisFavourite] = useState(false)
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const {user} = useContext(Context)
  const history = useHistory()

  let userId
  let role
  if (user.isAuth){
    userId = jwtDecode(localStorage.getItem('token')).id;
    role = jwtDecode(localStorage.getItem('token')).role;
  }

  const addFavourites = async () => {
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('deviceId', device.id)
    await AddToFavourite(formData)
    window.location.reload()
  }

  const deleteFavourites = async () => {
    await deleteFavouriteDevice(userId, device.id)
    window.location.reload()
  }


  const destroyDevice = async () => {
    await deleteDevice(id)
    history.push(SHOP_ROUTE)
  }

  useEffect(  () => {
    async function fetchData(){
      const data = await fetchOneDevice(id)
      setDevice(data)
      const userData = await fetchUserInfo(data.userId)
      setUserInfo(userData)
      const favouriteData = await fetchOneFavourite(userId, data.id)
      setisFavourite(favouriteData)
    }
    fetchData()
  }, [])


  return (
    <Container className="mt-3">
      <Row className='d-flex  justify-content-around'>
        <Col md={4}>
          <h2 className="ml-4">{device.name}</h2>
          <Image width={250} height={250} src={process.env.REACT_APP_API_URL + device.img}/>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{width: 300, height: 250, fontSize: 32, border: '5px solid lightgray'}}
          >
            <h3>Ціна: {device.price} грн.</h3>
            <Button
              variant={"outline-dark"}
              className="mt-2 p-2"
              onClick={()=> setDisplayUserInfoVisible(true)}
            >
              Данні продавця
            </Button>
            { isFavourite ?
                <Button
                    variant={"outline-dark"}
                    color="red"
                    appearance="primary"
                    className="p-2"
                    onClick={deleteFavourites}
                >
                  Видалити з обраного
                </Button>
                :
                <Button
                    variant={"outline-dark"}
                    className="p-2"
                    onClick={addFavourites}
                >
                  Добавити в обране
                </Button>
            }
            { userId === userInfo.userId || role === 'ADMIN' ?
                <Button
                    color="red"
                    appearance="primary"
                    onClick={destroyDevice}
                >
                  Видалити оголошення
                </Button>
                :
                null
            }
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
      <DisplayUserInfo show={displayUserInfoVisible} onHide={()=> setDisplayUserInfoVisible(false)}/>
    </Container>
  );
};

export default DevicePage;