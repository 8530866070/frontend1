import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserNavbar = ({ userName }) => {
  return (
    <Navbar bg="white" variant="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/user_login">
         BidSpeare 
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar-nav" />
        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user/home">
              🏛️ Home
            </Nav.Link>
            <Nav.Link as={Link} to="/user/products">
              📦 Add Products
            </Nav.Link>
            <Nav.Link as={Link} to="/user/contests">
              🏆 Contests
            </Nav.Link>
            <Nav.Link as={Link} to="/user/cart">
              🛒 Cart
            </Nav.Link>
          </Nav>
          <Form className="d-flex me-3">
            <FormControl type="search" placeholder="Search products..." className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <NavDropdown title={`👤 ${userName || "Profile"}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user/profile">
                👤 View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/">
                🚪 Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
               <NavDropdown.Item as={Link} to="/">
                🚪 History
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
