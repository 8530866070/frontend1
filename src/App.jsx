import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './componants/navbar/navbar';
import User_Navbar from './componants/USER/navbar';
import Home from './componants/home/home';
import Auction from './componants/auction/auction';
import Login from './componants/singup-in/login';
import Admin from './componants/singup-in/adminlog';
import Footer from './componants/footer/footer';
import Register from './componants/singup-in/register';
import AuctionDetailPage from './componants/auctiondetail/auctiondetail';
import ProductForm from './componants/product/product';
import AdminUsers from './componants/ADMIN/alluser';
import AdminProduct from './componants/ADMIN/allproduct';
import Leaderboard from './componants/USER/Leaderboard';


function LayoutWrapper({ children }) {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  // Show user layout only on logged-in pages
  const isUserPage = location.pathname.startsWith('/user');
    const isHomePage = location.pathname.startsWith('/user/home');

  //const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isUserPage && <Navbar />}
      {isUserPage && <User_Navbar />}
   
      


      {children}

      {isHomePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Public routes */}
          <Route path='/user/home' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/user/auctions' element={<Auction />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user/auctiondetail/:id' element={<AuctionDetailPage />} />
          <Route path='/user/products' element={<ProductForm />} />
          <Route path='/user/cart' element={<AdminUsers />} />
          <Route path='/user/contests' element={<AdminProduct />} />
          <Route path="/leaderboard/:productId" element={<Leaderboard />} />
          <Route path='/admin' element={<Admin />} />


        </Routes>
      </LayoutWrapper>
</BrowserRouter>
  );
}

export default App;