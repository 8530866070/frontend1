import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Spinner
} from "react-bootstrap";

const AuctionDetailPage = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Dummy userId — replace with actual logged-in user later
  const userId = "664a3a55df947ceff0ac442b";

  const fetchAuctionDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/product/${id}`);
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchBids = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/bids/${id}`);
      setBids(res.data);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }
  };

  useEffect(() => {
    fetchAuctionDetails();
    fetchBids();
  }, [id]);

  useEffect(() => {
    let interval;
    if (auction && auction.auctionEndDate) {
      interval = setInterval(() => {
        const now = new Date();
        const end = new Date(auction.auctionEndDate);
        const diff = end - now;
        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft("Auction ended");
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [auction]);

  const handleBid = async () => {
    const currentBid = auction.highestBid || auction.baseBid;
    if (!bidAmount || parseFloat(bidAmount) <= currentBid) {
      alert("Bid must be higher than the current bid.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/auth/placebid/${id}`, {
        userId,
        bidAmount: parseFloat(bidAmount)
      });

      setBidAmount("");
      fetchAuctionDetails();
      fetchBids();
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  if (!auction) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading auction...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={auction.image || "https://via.placeholder.com/400x300?text=No+Image"}
              style={{ width: "100%", height: "300px", objectFit: "contain" }}
            />
            <Card.Body>
              <Card.Title>{auction.productName}</Card.Title>
              <Card.Text>Description: {auction.description}</Card.Text>
              <Card.Text>Base Bid: ₹{auction.baseBid}</Card.Text>
              <Card.Text>Current Bid: ₹{auction.highestBid || auction.baseBid}</Card.Text>
              <Card.Text>Ends In: {timeLeft}</Card.Text>

              <Form>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleBid} disabled={timeLeft === "Auction ended"}>
                  Place Bid
                </Button>
              </Form>

              <Button as={Link} to="/user/home" className="mt-3" variant="primary">
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h4 id="bid-history">Bid History</h4>
          <ListGroup>
            {bids.length > 0 ? (
              bids.map((bid, index) => (
                <ListGroup.Item key={index}>
                  {bid.userId?.username || "User"} - ₹{bid.bidAmount} at {new Date(bid.bidTime).toLocaleTimeString()}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No bids yet</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AuctionDetailPage;