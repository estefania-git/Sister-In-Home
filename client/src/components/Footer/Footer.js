import React, { Component } from 'react'
import { Card,  } from "react-bootstrap";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import "./Footer.css"

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                
           <Card bg="dark" text="white" style={{ width: '115rem', height: '8rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Dark Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
            </div>
        )
    }
}
