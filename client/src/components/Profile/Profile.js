import React, { Component } from "react";
import './Profile.css'
import { Form, Button } from "react-bootstrap";
import AuthService from "../../services/AuthService";

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
        <p> Description : <br/> {this.props.user.description}</p>

        <div className="photo">
          <img src={this.props.user.picture} alt="" />
        </div>
        <br />
       <div>
       <h3> Edit your Profile</h3>
        <Form onSubmit={(e)=>{this.handleSubmitImage(e)}}>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Edit Photo</Form.Label>
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
        <Form id="form" onSubmit={this.handleSignUp}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              required
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your User Name with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
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
        </div>
      </div>
    );
  }
}
