import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'
import { Form, Button } from "react-bootstrap";
import "./Signup.css"
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: '',
    picture: '',
    // role:'',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  handleUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('picture', e.target.files[0])
    this.authService.upload(uploadData)
    .then(
      (data) => {
        this.setState({...this.state, picture: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password, } = this.state;
    return (
      <div>
        <PageTitle color="black">Sign Up</PageTitle>
        <br/>
          <Form  id="form" onSubmit={this.handleSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="username" placeholder="Enter email" value={username} required onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password" required onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="mami" />
            <Form.Check type="checkbox" label="sister" />
            </Form.Group>
          <Button variant="primary" type="submit" value="Create account">
              Submit
  </Button>
          </Form>
          
      </div>
    )
  }
}
     
         
          
          
          

