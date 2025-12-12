import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

const navbar = () => {
  return (
    <div>
       <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand href="/user/home">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2021/09/30/BS-logo-design-vector-Graphics-18106139-1-1-580x386.jpg"
            width="40"
            height="40"
            className="d-inline-block align-top rounded-circle me-2"
            alt="Logo"
          />
          <span className="fw-bold fs-4">BidSphere</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="user-navbar-nav" />
        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">
              🏛️ USER
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              📦 ADMIN
            </Nav.Link>
            </Nav>
           </Navbar.Collapse>
      </Container>
    </Navbar>
     
    </div>
  )
}

export default navbar
