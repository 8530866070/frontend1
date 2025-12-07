import React,{useState} from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from "../../api/axios";
import { Link , useNavigate} from 'react-router-dom';

export default function LoginPage() {

   const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const loginUser = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/login', {
      email: user.email,
      password: user.password
    });
     localStorage.setItem('token', res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert('Login successful!');
    navigate('/user/home');
  } catch (err) {
    alert(err.response?.data?.message || 'Invalid credentials');
  }
};

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">User Login</h3>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                 type="email"
                 placeholder="Enter email"
                 name="email"                
                 value={user.email}
                 onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
               type="password"
               placeholder="Password"
               name="password"             
               value={user.password}
               onChange={handleChange}
            />          
            </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Login</Button>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
}
