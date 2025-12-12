import React from 'react'
import { Container, Row, Col, Button, Card, Spinner,Carousel  } from 'react-bootstrap';
import Footer from './footer/footer';
import { Link } from 'react-router-dom';


const landingpage = () => {
  return (
    <div>
   
    <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <Carousel indicators={false} controls={true} interval={2000}>
            
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.shutterstock.com/shutterstock/photos/1884779143/display_1500/stock-vector-welcome-gold-letters-banner-can-use-for-landing-page-template-ui-web-mobile-app-poster-1884779143.jpg"
                    alt="Auction Banner 1"
                    style={{ height: "400px", objectFit: "cover" }}
                />
            </Carousel.Item>
    
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.shutterstock.com/image-illustration/auction-gold-text-on-black-260nw-510226834.jpg"
                    alt="Auction Banner 2"
                    style={{ height: "400px", objectFit: "cover" }}
                />
            </Carousel.Item>
    
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://media.istockphoto.com/id/1391693353/vector/diverse-group-of-bidders-hand-raising-auction-bid-paddles.jpg?s=612x612&w=0&k=20&c=0iyd8fmbB7U3ZTQudrD4qtThHbl6Vl8IRzLN_z_7RGE="
                alt="Auction Banner 3"
                style={{ height: "400px", objectFit: "cover" }}
                />
            </Carousel.Item>
    
            </Carousel>
        </div>
            <div className="bg-dark text-warning py-5 text-left">
            <Container>
                <h1 className="display-4 fw-bold">Welcome to BidSphere</h1>
                <p className="lead text-white">
                <i>A smarter way to bid, buy, and win! Experience real-time auctions with secure and smooth transactions.</i>
                </p>
                <Link to={`/login`}>
                <Button className='btn btn-warning fw-bold mt-3' size="lg">Start Bidding</Button>
                </Link>
            </Container>
            </div> 
        
            <div className="bg-dark text-warning py-5 px-3">
      <div className="container py-4">
        <div className="row align-items-center">

          {/* Left Image - Fade Animation */}
          <div className="col-md-6 mb-4 animate__animated animate__fadeIn">
            <img
              src="https://connecteam.com/wp-content/uploads/2024/05/shift-bidding.jpg"
              alt="auction"
              className="img-fluid rounded shadow border border-warning"
            />
          </div>

          {/* Right Content - Slide Animation */}
          <div className="col-md-6 animate__animated animate__slideInRight">
            <h2 className="fw-bold mb-3 text-warning">
              About Our Online Auction System
            </h2>

            <p className="text-light">
              Our online auction platform provides a premium, secure, and 
              interactive environment where users can bid on products in 
              real time with full transparency.
            </p>

            <ul className="text-light">
              <li>Real-time live bidding</li>
              <li>Instant outbid notifications</li>
              <li>Secure user authentication</li>
              <li>Product details with full bidding history</li>
              <li>Easy tracking & user dashboard</li>
            </ul>

            <p className="text-light">
              With a dark premium theme and smooth animations, our system 
              delivers a professional auction experience.
            </p>

            <button className="btn btn-warning fw-bold mt-3">
              Explore Auctions
            </button>

          </div>

        </div>
      </div>
    </div>
    <Footer />
        </div>
  )
}



export default landingpage
