import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

import { useParams } from 'react-router-dom';
import { Card, Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const Leaderboard = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await axios.get(`/productbyid/${productId}`);
        setProduct(prod.data);

        const bidRes = await axios.get(`/bids/${productId}`);
        setBids(bidRes.data);
      } catch (err) {
        console.error('Error loading leaderboard data:', err);
      }
    };
    fetchData();
  }, [productId]);

  const handleBidSubmit = async (e) => {
  e.preventDefault();
  if (!newBid) return;

  try {
    await axios.post('/bid', {
      productId: productId,
      user: userId,         
      amount: Number(newBid) 
    });

    const bidRes = await axios.get(`/bids/${productId}`);
    setBids(bidRes.data);
    setNewBid('');
  } catch (err) {
    console.error('Error placing bid:', err);
    alert("Failed to place bid");
  }
};

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <Row>
          <Col md={5} className="mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={7}>
            <h2>{product.name}</h2>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>End:</strong>  {new Date(product.auctionEndDate).toLocaleString()}</p>
            <p><strong>Starting Bid:</strong> ₹{product.baseBid}</p>
            <h5 className="mt-3" style={{color:"green"}}>💰 Highest Bid: ₹{bids[0]?.amount || "No bids yet"}</h5>
          </Col>
        </Row>

        {/* Bidding Form */}
        <Form onSubmit={handleBidSubmit} className="my-4">
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Your Bid (₹)</Form.Label>
                <Form.Control
                  type="number"
                  min={(bids[0]?.amount || product.baseBid || 0) + 1}
                  value={newBid}
                  onChange={(e) => setNewBid(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className="mt-3">   {/* disabled={!userId} */}
            Place Bid
          </Button>
        </Form>

        {/* Bid History */}
        <h5>📜 Bid History</h5>
        <ListGroup>
          {bids.length > 0 ? (
            bids.map((bid, i) => (
              <ListGroup.Item key={i}>
             <i style={{color:"purple"}}>{bid.user.name}</i> <p style={{alignItems:'center'}}>₹{bid.amount} — {new Date(bid.timestamp).toLocaleString()}</p>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No bids yet</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Leaderboard;
