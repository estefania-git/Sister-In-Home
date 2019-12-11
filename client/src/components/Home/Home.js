import React, { Component , Link} from 'react'
import Homes from './Home.css'
import { Carousel , Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";


class Home extends Component {
  render() {
    return (
      <div id="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/1.jpg"
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
              src="images/free-babysitter-vector.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/vector-modern-babysitter-nanny-service-cartoon-illustration.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3> </h3>
              <p>
               
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Home;