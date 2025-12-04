import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">BidSphere</h5>
            <p>Your trusted platform for real-time online auctions. Bid smart, win big!</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#auctions" className="text-light text-decoration-none">Auctions</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold">Contact Info</h6>
            <p>Email: support@bidsphere.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center m-0">© {new Date().getFullYear()} BidSphere. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default FooterComponent;
