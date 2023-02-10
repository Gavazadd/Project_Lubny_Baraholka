import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";


const Activate = () => {
  return (
    <Container className="p-4">
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Пошту успішно підтверджено!</strong>
          </h3>
        </header>
        <Link to={"/login"}  className="nav-link">
          Будь ласка авторизуйтесь!
        </Link>
      </div>
    </Container>
  );
};

export default Activate;