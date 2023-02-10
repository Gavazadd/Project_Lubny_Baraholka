import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const CategoryBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <ListGroup>
      {device.categories.map(category =>
        <ListGroup.Item
          style={{cursor: 'pointer'}}
          active={category.id === device.selectedCategory.id}
          onClick={() => device.setSelectedCategory(category)}
          key={category.id}
        >
          {category.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default CategoryBar;