import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      
      <div className="card">
      <br/>
        <h3>By</h3>
       
        <p>Estefanía del Castillo Medrano.</p>

        <br />
      </div>
    );
  }
}
