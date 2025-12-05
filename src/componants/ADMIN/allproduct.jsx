import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Spinner } from "react-bootstrap";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/allproducts");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🛒 All Products (Admin Panel)</h2>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Base Price</th>
              <th>AuctionEndDate</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₹{product.baseBid}</td>
                <td>{product.auctionEndDate}</td>
                <td>
                  <img src={product.image} alt={product.name} width="60" />
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-2">View</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center">No products found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminAllProducts;
