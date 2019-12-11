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

class App extends Component {
  constructor(props) {
    super(props);
    //  this.todoService = new TodoService();
    this.authService = new AuthService();
  }

  state = {
    user: null
  };

  setUser = user => {
    this.setState({
      ...this.state,
      user
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
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    //  const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" render={match => <Home {...match} />} />
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
          </Switch>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
