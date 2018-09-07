import React, { Component } from 'react';

class Login extends React.Component {
  constructor(){
    super();
  }
  state = {
    redirectToReferrer: false
  };


/*  login.fakeAuth.authenticate( ()=> {
    this.setState({ redirectToReferrer: true })
  }
*/

handleLogin(event) {
  event.preventDefault();

  fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "login": this.state.login,
      "password": this.state.password,
    })
  }).then(res => res.json()).then(data => console.log(data));
}

handleInputChange(event) {
  const value = event.target.value;
  const name = event.target.name;

  this.setState({
    [name]: value
  });
}


  render() {
    return (
      <div>
      <form onSubmit={this.handleLogin}>
        <label htmlFor="login">Login</label>
        <input id="login" name="login" type="text" onChange={this.handleInputChange}/>
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" onChange={this.handleInputChange}/>
        <br />
        <button>Send data!</button>
      </form>
      </div>
    );
  }
}

export default Login;
