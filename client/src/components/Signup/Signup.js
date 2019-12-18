import React, { Component } from "react";
import PageTitle from "../../fontStyles/PageTitle";
import AuthService from "../../services/AuthService";
import { Form, Button } from "react-bootstrap";
import "./Signup.css";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    role: "Mami",
    description: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  
  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
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

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);
    this.authService.upload(uploadData).then(
      data => {
        this.setState({ ...this.state, picture: data.secure_url });
      },
      error => {
        console.error(error);
      }
    );
  };

  role = e => {
    this.setState({...this.state, role: e.target.value});
    };

  

  render() {
    const { username, password, role, description } = this.state;
    return (
      <div>
      <br/>
        <PageTitle color="black"><h1>Sign Up</h1></PageTitle>
        <br />
        <Form id="form" onSubmit={this.handleSignUp}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label><h5>User Name</h5></Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={username}
              required
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your User Name with anyone else.
            </Form.Text>
          </Form.Group>


          <Form.Group controlId="formBasicDescription">
            <Form.Label><h5>Description</h5></Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a Description"
              value={description}
              name="description"
              
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label><h5>Password</h5></Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label><h5>Example select Role</h5></Form.Label>
            <Form.Control
              onChange={e => {
                this.role(e);
              }}
              as="select"
            >
              <option>Mami</option>
              <option>Sister</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" value="Create account">
            Submit
          </Button>
          </Form>
        <br />
      </div>
    );
  }
}
