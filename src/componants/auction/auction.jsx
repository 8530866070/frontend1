import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card, NavLink} from 'react-bootstrap';


const auctionItems = [
  {
    id: 1,
    name: "OPPO A3x-5G.",
    image: "https://jamesandco.in/wp-content/uploads/2024/09/mobile-28.png",
    baseBid: 3000,
    currentBid: 3500,
    endDate: "2025-06-01",
  },
  {
    id: 2,
    name: "VIVO Y200e-5G.",
    image: "https://vasanthandco.in/UploadedFiles/productimages/20240622113325-61p9OByM1kL._SX679_.jpg",
    baseBid: 1200,
    currentBid: 1450,
    endDate: "2025-06-03",
  },
  {
    id: 3,
    name: "Samsung 4K Smart TV",
    image: "https://www.wizbiker.com/image/cache/catalog/Products/Fuji/fuji-27-5-adventure-mountain-bike-2021-satin-silver-1-1000x1000.jpg",
    baseBid: 800,
    currentBid: 980,
    endDate: "2025-06-04",
  },
   {
    id: 4,
    name: "Samsung 4K Smart TV",
    image: "https://www.financialexpress.com/wp-content/uploads/2024/09/SUVs-2.png",
    baseBid: 120000,
    currentBid: 130080,
    endDate: "2025-06-04",
  },
   {
    id: 5,
    name: "Samsung 4K Smart TV",
    image: "https://via.placeholder.com/300",
    baseBid: 800,
    currentBid: 980,
    endDate: "2025-06-04",
  },
];
const auction = () => {
  return (
   <Container className="my-4">
      <h2 className="mb-4 text-center">Live Auction Products</h2>
      <Row>
        {auctionItems.map(item => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} style={{width:"250px", height:"250px"}} />
              <Card.Body>
                <Card.Title><b>{item.name}</b></Card.Title>
                <Card.Text>Base Bid: ₹{item.baseBid}</Card.Text>
                <Card.Text>Current Bid: ₹{item.currentBid}</Card.Text>
                <Card.Text>Ends on: {item.endDate}</Card.Text>
                <Link to={'/auctiondetail'}><Button variant="primary">Join Bid</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default auction
