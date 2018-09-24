import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AuthService from "./helpers/AuthService";
import Login from "./routes/Login";
import Companies from "./routes/Companies";
import Users from "./routes/Users";
import { connect } from "react-redux";
import { setLoggedInStatus } from "./actions/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleUpdateLoggedInState = this.handleUpdateLoggedInState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loggedIn = this.Auth.loggedIn();
    this.handleUpdateLoggedInState(this.loggedIn);
  }

  handleLogout() {
    this.Auth.logout();
    this.loggedIn = this.Auth.loggedIn();
    this.handleUpdateLoggedInState(this.loggedIn);
  }

  handleUpdateLoggedInState(status) {
    this.props.setLoggedInStatus(status);
  }

  render() {
    const isLoggedIn = this.props.loggedInStatus;
    let logoutButton;
    if (isLoggedIn) {
      logoutButton = (
        <Link to="/login" onClick={this.handleLogout}>
          <Button>Logout</Button>
        </Link>
      );
    } else {
      logoutButton = <div />;
    }
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              <div>
                <AppBar position="static" color="default">
                  <Toolbar>
                    {logoutButton}
                    <Link to="/users">
                      <Button>Users</Button>
                    </Link>
                    <Link to="/companies">
                      <Button>Companies</Button>
                    </Link>
                  </Toolbar>
                </AppBar>
                <Route exact path="/login" component={Login} />
                <Route path="/companies" component={Companies} />
                <Route exact path="/users" component={Users} />
              </div>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInStatus: state.login.loggedInStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInStatus: status => {
      dispatch(setLoggedInStatus(status));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
