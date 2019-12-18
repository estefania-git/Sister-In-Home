import React, { Component } from "react";
import './Profile.css'
import {
  Form, Button} from "react-bootstrap";
import AuthService from "../../services/AuthService";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.authService = new AuthService();
        this.state = {
            id: this.props.user.id,
            username: this.props.user.username,
            description: this.props.user.description,
            photo: this.props.user.picture
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        if (name === "photo") {
          console.log(e.target)
          this.setState({ ...this.state, photo: e.target.files[0] });
        } else {
          this.setState({ ...this.state, [name]: value });
        }
       
    };

    handleSubmitImage = e => {
        e.preventDefault();
        const { history, setUser } = this.props;
        this.authService.updateImage({id: this.state.id, photo: this.state.photo})
        .then(
          user => {
            setUser(user);
            history.push("/profile");
          },
          error => {
            console.error(error);
          }
        );
    }


    handleSignUp = e => {
        e.preventDefault();
        const { history, setUser } = this.props;
        this.authService.updateUser(this.state)
            .then(
                user => {
                    setUser(user);
                    history.push("/profile");
                },
                error => {
                    console.error(error);
                }
            );
    };
    
  render() {
      console.log(this.props)
    return (
      <div>
        <h1> Welcome {this.props.user.username}</h1>
<br/>
<div className="div-container">
        <div className="div-profile">
          <Card>
              <CardTitle className="CardTitle"> <h1>Your Profile</h1> </CardTitle>
            <CardImg top width="100%" src={this.props.user.picture} alt="Card image cap" />
            <CardBody>
                <CardSubtitle className="ep"> <h2>{this.props.user.username}</h2></CardSubtitle>
                <CardText className="ds"><h3>Description : </h3><br /> <h4>{this.props.user.description}</h4></CardText>
             </CardBody>
          </Card>
            <br />
        </div>
       
        <div className="div-profile">
        <Card>
              <CardTitle className="CardTitle"><h1> Edit Profile </h1></CardTitle>
              <CardImg top width="100%" src={this.props.user.picture} alt="Card image cap" />
              <CardBody>
              <Form onSubmit={(e)=>{this.handleSubmitImage(e)}}>
              <Form.Group controlId="formBasicDescription">
                    <Form.Label className="ep"><h2>Edit Photo</h2></Form.Label>
              <Form.Control
              type="file"
              placeholder="Change your Image"
              name="photo"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" value="Create account">
            Submit
          </Button>
         
        </Form>
                <br />
        <Form id="form" onSubmit={this.handleSignUp}>
          <Form.Group controlId="formBasicUsername">
                    <Form.Label> <h4>User Name</h4></Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              required
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
                    <Form.Label> <h4>Description</h4></Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a Description"
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
            />
          </Form.Group>
         <Button variant="primary" type="submit" value="Create account">
            Submit
          </Button>
        </Form>
              </CardBody>
        </Card>
            <br></br>
        </div>
        
        </div>
      </div>
    );
  }
}
