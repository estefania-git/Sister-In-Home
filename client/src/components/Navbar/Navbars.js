import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";


export default class Navbars extends Component {
  logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  render() {
    return (
      <div>
        {this.props.user == null ? (
          <div id="home">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/"> <h1>Sister In Home </h1> </Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </Nav>
            </Navbar>
          </div>
        ) : (
          <div id="home">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href=""> <h1>Sister In Home</h1></Navbar.Brand>
              <Nav className="mr-auto">
                <Link to="/profile"> Profile</Link>

                <Link to="/search"> Search </Link>
                <Link to="/" onClick={() => this.props.logout()}>
                  Logout
                </Link>
              </Nav>
            </Navbar>
          </div>
        )}
      </div>
    );
  }
}
