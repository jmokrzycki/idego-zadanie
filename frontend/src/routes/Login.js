import React, { Component } from 'react';
import AuthService from './AuthService';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          username: "",
          password: "",
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.Auth = new AuthService();
  }

handleLogin(event) {
  event.preventDefault();

  this.Auth.login(this.state.username,this.state.password)
      .then(res =>{
         this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })
}

handleLogout(){
  this.Auth.logout();
}

handleInputChange(event) {
  console.log(this)
  this.setState({
    [event.target.name]: event.target.value
  });
}



  render() {
    if(!this.Auth.loggedIn()){
      return (
        <div>
          <form onSubmit={this.handleLogin}>
            <label htmlFor="username">Login</label>
            <input id="username" name="username" type="text" onChange={this.handleInputChange}/>
            <br />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="text" onChange={this.handleInputChange}/>
            <br />
            <button>Send data!</button>
          </form>
        </div>
      );
    } else {
      return <button onClick={this.handleLogout}>Logout</button>;
    }
  }
}

export default Login;
