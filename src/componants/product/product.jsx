import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from '../../api/axios'; // make sure this points to your axios setup
import { Link , useNavigate} from 'react-router-dom';


const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    baseBid: '',
    auctionEndDate: ''
  });

    const navigate = useNavigate();
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('/product', {
            name: formData.name,
            description: formData.description,
            image: formData.image,
            baseBid: formData.baseBid,
            auctionEndDate: formData.auctionEndDate
          });
    alert('product Added successful!');
    navigate('/user/home');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Add Product for Auction</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Base Bid</Form.Label>
            <Form.Control
              type="number"
              name="baseBid"
              value={formData.baseBid}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Auction End Date</Form.Label>
            <Form.Control
              type="date"
              name="auctionEndDate"
              value={formData.auctionEndDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" variant="success">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductForm;
