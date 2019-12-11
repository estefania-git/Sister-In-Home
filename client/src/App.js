import React, { Component } from "react";
import "./App.css";
import TodoService from "./services/TodoService";
// import TodoList from "./components/TodoList/TodoList";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import AuthService from "./services/AuthService";
// import PrivateRoute from "./guards/PrivateRoute";
import Home from "./components/Home/Home";
// import { Carousel } from "react-bootstrap";
import Navbars from "./components/Navbar/Navbars";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    //  this.todoService = new TodoService();
    this.authService = new AuthService();
  }

  setUser = user => {
    this.setState({
      ...this.state,
      user: user
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(null);
          }
        )
        .catch(() => {
          this.setUser(null);
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  logout = () => {
    this.authService.logout().then(() => {
      this.setState({ user: null });
    });
  };

//   logout() {
//     localStorage.clear();
//     window.location.href = "/";
//   }

  render() {
    //   const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Navbars className="navbars" user={this.state.user} logout={this.logout}></Navbars>
        </header>
        {this.state.user == null ? (
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              exact
              path="/login"
              render={match => <Login {...match} setUser={this.setUser} />}
            />
            <Route
              exact
              path="/signup"
              render={match => <SignUp {...match} setUser={this.setUser} />}
            />
            <footer className="App-Footer">
              <Footer className="footer"></Footer>
            </footer>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" render={() => <Profile />} />
            <footer className="App-Footer">
              <Footer className="footer"></Footer>
            </footer>
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(App);
