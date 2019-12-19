import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
     
      <footer className="footer">
      <div className="fl">
      <h3>By   </h3>
      </div>
     <div className="fr">
       <h4>Estefanía del Castillo Medrano.</h4>
        </div>
      </footer> 
    );
  }
}
