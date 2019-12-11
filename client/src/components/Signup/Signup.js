import React, { Component } from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: '',
    picture: ''
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
        <PageTitle color="black">SignUp</PageTitle>
        <form onSubmit={this.handleSignUp}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} name="password" required onChange={this.handleChange}/>
         
          <input type="submit" value="Create account"/>
        </form>
      </div>
    )
  }
}

