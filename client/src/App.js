import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link, withRouter } from "react-router-dom";

class App extends Component {
 render(){
    return (
   <h1>Hola</h1>
  );
 }
}

export default withRouter(App);
