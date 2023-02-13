import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryBar from "../components/CategoryBar";
import OfferTypeBar from "../components/OfferTypeBar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchOfferTypes} from "../http/adminAPI";
import {fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";


const ShopPage = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchCategories().then(data => device.setCategories(data))
    fetchOfferTypes().then(data => device.setOfferTypes(data))
    fetchDevices(null, null, 1, 2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedCategory.id, device.selectedOfferType.id, device.page, 2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedCategory, device.selectedOfferType,])
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <CategoryBar/>
        </Col>
        <Col md={9}>
          <OfferTypeBar/>
          <DeviceList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
})

export default ShopPage;