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
            <br/>
            <Carousel.Caption>
            
              <h3> No sabes con quién a tus hijos dejar , en esta app te podemos ayudar.</h3>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/free-babysitter-vector.png"
              alt="Third slide"
            />
            <br/>
            <Carousel.Caption>
            
              <h3> Ponte en contacto con tu Baby Sister , ve sus valoraciones y escoge a la que más se ajuste a tus necesidades.</h3>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/vector-modern-babysitter-nanny-service-cartoon-illustration.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
            
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Home;