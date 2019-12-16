import React, { Component } from "react";
import './Profile.css'


export default class Profile extends Component {
  render() {
    return (
      <div>
        <h1> Welcome {this.props.user.username}</h1>
        
        <div className="photo">
          <img src={this.props.user.picture} alt="" />
          
        </div>
      </div>
    );
  }
}
