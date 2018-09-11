import React, { Component } from "react";
import AuthService from "./AuthService";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Switch } from "react-router-dom";

//react-material
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Companies from "./Companies";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.Auth = new AuthService();
  }

  handleLogin(event) {
    event.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/companies");
      })
      .catch(err => {
        alert(err);
      });
  }

  handleLogout() {
    this.Auth.logout();
  }

  handleInputChange(event) {
    console.log(this);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (!this.Auth.loggedIn()) {
      return (
        <div>
          <form onSubmit={this.handleLogin}>
            <label htmlFor="username">Login</label>
            <TextField
              margin="dense"
              label="Username"
              name="username"
              type="text"
              fullWidth
              onChange={this.handleInputChange}
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="text"
              fullWidth
              onChange={this.handleInputChange}
            />
            <Button onClick={this.handleLogin}>Login</Button>
          </form>
        </div>
      );
    } else {
      return <div>Logged!</div>;
    }
  }
}

export default Login;
