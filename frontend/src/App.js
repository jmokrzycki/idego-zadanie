import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";

import AuthService from "./helpers/AuthService";

import Login from "./routes/Login";
import Companies from "./routes/Companies";
import Users from "./routes/Users";

const Auth = new AuthService();

class App extends Component {
  componentDidMount(res) {}

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              <div>
                <AppBar position="static" color="default">
                  <Toolbar>
                    <Link to="/login" onClick={Auth.logout}>
                      <Button>Logout</Button>
                    </Link>
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

export default App;
