import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const OfferTypeBar = observer(() => {
  const {device} = useContext(Context)

  return (
    <Row className= "ml-2">
      {device.offerTypes.map(brand =>
        <Card
          style={{cursor:'pointer'}}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedOfferType(brand)}
          border={brand.id === device.selectedOfferType.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default OfferTypeBar;