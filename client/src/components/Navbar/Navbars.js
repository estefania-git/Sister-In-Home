import React, { Component } from 'react'
import { Navbar, Nav} from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";


export default class Navbars extends Component {
    render() {
        return (
            <div>
                {this.props.user == null ? 
                          <div id="home">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="">Sister In Home</Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </Nav>
            </Navbar>
          </div>

                :
                          <div id="home">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="">Sister In Home</Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <Link to="/signup">Logout</Link>
              </Nav>
            </Navbar>
          </div>

                }
            </div>
        )
    }
}
