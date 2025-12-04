import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const Leaderboard = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');
  const [user, setUser] = useState('');

  // Fetch product and bids
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(`/auth/product/${productId}`);
        setProduct(prodRes.data);

        const bidRes = await axios.get(`/auth/bids/${productId}`);
        setBids(bidRes.data);
      } catch (err) {
        console.error('Error loading leaderboard data:', err);
      }
    };
    fetchData();
  }, [productId]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!newBid || !user) return;

    try {
      await axios.post('/auth/bid', {
        productId,
        user,
        amount: Number(newBid),
      });

      const bidRes = await axios.get(`/auth/bids/${productId}`);
      setBids(bidRes.data);
      setNewBid('');
    } catch (err) {
      console.error('Error placing bid:', err);
    }
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <Row>
          <Col md={5} className="mb-3">
            
              <img
                src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/PDP-Highlight-Consumer-Laptop-Go-3-Platinum-001:VP1-539x440"
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            
          </Col>
          <Col md={7}>
            <h2>{product.name}</h2>
            <p><strong>Owner:</strong> Rohan kanade</p>
            {product.description && <p><strong>Description:</strong> {product.description}</p>}
            {product.category && <p><strong>Category:</strong> {product.category}</p>}
            {product.baseBid && <p><strong>Starting Bid:</strong> ₹{product.baseBid}</p>}
            <h5 className="mt-3">💰 Top Bid: ₹{bids[0]?.amount || 'No bids yet'}</h5>
          </Col>
        </Row>

        {/* Bidding Form */}
        <Form onSubmit={handleBidSubmit} className="my-4">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
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
          <Button type="submit" className="mt-3">Place Bid</Button>
        </Form>

        {/* Bid History */}
        <h5>📜 Bid History</h5>
        <ListGroup>
          {bids.map((bid, idx) => (
            <ListGroup.Item key={idx}>
              ₹{bid.amount} by <strong>{bid.user}</strong> at {new Date(bid.timestamp).toLocaleString()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Leaderboard;
