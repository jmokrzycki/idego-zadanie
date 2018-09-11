import React, { Component } from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <label htmlFor="username">Login</label>{" "}
          <input
            id="username"
            name="username"
            type="text"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <label htmlFor="password"> Password </label>{" "}
          <input
            id="password"
            name="password"
            type="text"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <label htmlFor="email"> Email </label>{" "}
          <input
            id="email"
            name="email"
            type="text"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <button> Send data! </button>{" "}
        </form>{" "}
      </div>
    );
  }
}

export default Signup;
