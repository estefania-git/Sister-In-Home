import React, { Component } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";


export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="">Sister In Home</Navbar.Brand>
              <Nav className="mr-auto">
                <Link to=""></Link>
                <Link to=""></Link>
              </Nav>
            </Navbar>
            </div>
        )
    }
}
