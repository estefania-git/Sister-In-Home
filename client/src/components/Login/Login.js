import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService';
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/profile")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <PageTitle color="black">Login</PageTitle>
        
        <br/>
          <Form  id="form" onSubmit={this.handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" name="username" placeholder="Enter username" value={username}  onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
            <Form.Control type="password"  name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
            </Form.Group>
           
          <Button variant="primary" type="submit" value="Login">
              Submit
  </Button>
          </Form>
      </div>
    )
  }
}
