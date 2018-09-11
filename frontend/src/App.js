import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Switch } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Button from '@material-ui/core/Button';

import AuthService from "./helpers/AuthService";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Companies from "./routes/Companies";
import Users from "./routes/Users";


const Auth = new AuthService();

class App extends Component {
  constructor() {
    super();
  }

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
                    <Link to="/signup"><Button>Signup</Button></Link>
                    <Link to="/users"><Button>Users</Button></Link>
                    <Link to="/companies"><Button>Companies</Button></Link>
                  </Toolbar>
                </AppBar>

                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
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
