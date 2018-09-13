import React, { Component } from "react";
import AuthService from "../helpers/AuthService";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (!this.Auth.loggedIn()) {
      return (
        <div>
          <Paper className="loginContainer">
            <form onSubmit={this.handleLogin}>
              <TextField
                margin="dense"
                label="Username"
                name="username"
                type="text"
                onChange={this.handleInputChange}
              />
              <br />
              <TextField
                margin="dense"
                label="Password"
                name="password"
                type="password"
                onChange={this.handleInputChange}
              />
              <br />
              <Button className="loginButton" onClick={this.handleLogin}>
                Login
              </Button>
            </form>
          </Paper>
        </div>
      );
    } else {
      return <div>Logged!</div>;
    }
  }
}

export default Login;
