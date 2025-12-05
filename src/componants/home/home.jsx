import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

export default function HomePage() {
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/allproducts');
        setAuctionItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <div id='boddy'>
      <br />
      <div className="text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">Welcome to BidSphere</h1>
          <p className="lead">
            <i>A smarter way to bid, buy, and win! Experience real-time auctions with secure and smooth transactions.</i>
          </p>
          <Button variant="primary" size="lg">Start Bidding</Button>
        </Container>
      </div>
      <br />

      <Container className="my-4">
        <h4 className="mb-3 text-center" style={{ fontWeight: 800, color: "green" }}>Live Auction !!</h4>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          <Row>
            {auctionItems.length > 0 ? (
              auctionItems.map(item => (
                <Col md={4} key={item._id} className="mb-4">
                  <Card style={{border:"1px solid black"}}>
                    <Card.Img variant="top" src={item.image} style={{ width: "200px", height: "180px", margin: "20px auto" }} />
                    <Card.Body>
                      <Card.Title><b>{item.name}</b></Card.Title>
                      <Card.Text>Base Bid: ₹{item.baseBid}</Card.Text>
                      <Card.Text>Current Bid: ₹{item.highestBid}</Card.Text>
                      <Card.Text>Ends on: {new Date(item.auctionEndDate).toLocaleDateString()}</Card.Text>
                     <Link to={`/leaderboard/${item._id}`}>
                        <Button variant="primary">Join Bid</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No products available</p>
            )}
          </Row>
        )}
      </Container>
      </div>
    </>
    
  );
}
