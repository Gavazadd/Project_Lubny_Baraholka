import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCategory from "../components/modals/create/CreateCategory";
import CreateOfferType from "../components/modals/create/CreateOfferType";
import DeleteOfferType from "../components/modals/delete/DeleteOfferType";
import DeleteCategory from "../components/modals/delete/DeleteCategory";


const AdminPage = () =>{
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false)
  const [deleteCategoryVisible, setDeleteCategoryVisible] = useState(false)
  const [createOfferTypeVisible, setCreateOfferTypeVisible] = useState(false)
  const [deleteOfferTypeVisible, setDeleteOfferTypeVisible] = useState(false)
  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={()=> setCreateCategoryVisible(true)}
      >
        Добавити категорію
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={()=> setDeleteCategoryVisible(true)}
      >
        Видалити категорію
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={()=> setCreateOfferTypeVisible(true)}

      >
        Добавити тип оголошення
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={()=> setDeleteOfferTypeVisible(true)}

      >
        Видалити тип оголошення
      </Button>
      <CreateCategory show={createCategoryVisible} onHide={()=> setCreateCategoryVisible(false)}/>
      <DeleteCategory show={deleteCategoryVisible} onHide={()=> setDeleteCategoryVisible(false)}/>
      <CreateOfferType show={createOfferTypeVisible} onHide={()=> setCreateOfferTypeVisible(false)}/>
      <DeleteOfferType show={deleteOfferTypeVisible} onHide={()=> setDeleteOfferTypeVisible(false)}/>
    </Container>
  );
};

export default AdminPage;;