import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      
      <div className="footer">
      
        <h3>By</h3>
       
        <h4>Estefanía del Castillo Medrano.</h4>
       <br></br>  
      </div>
    );
  }
}
