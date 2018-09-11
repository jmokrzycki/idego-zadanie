import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Switch } from "react-router-dom";

import AuthService from "./routes/AuthService";

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
                <Link to="/login" onClick={Auth.logout}>
                  Logout
                </Link>
                <Link to="/signup">Signup</Link>
                <Link to="/users">Users</Link>
                <Link to="/companies">Companies</Link>

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
