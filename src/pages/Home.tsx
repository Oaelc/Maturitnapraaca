import React from 'react';
import Navbar from '../components/navbar';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "../components/home.css"
// Import your images
import firstSlideImage from '../images/shrecik2.jpg'; // Update the path as necessary
import secondSlideImage from '../images/shrecik3.jpg'; // Update the path as necessary
import thirdSlideImage from '../images/shrecikjpg.jpg'; // Update the path as necessary

const Home: React.FC = () => {
  return (
    <div className="homepage">
      <header>
        
      </header>
      
      <main className="homecontent">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={firstSlideImage}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={secondSlideImage}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={thirdSlideImage}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </main>
    </div>
  );
};

export default Home;
