import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Companies from './Companies';
import Users from './Users';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      false ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


export default () => (
<div>

<Router>
  <div>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/companies' component={Companies}/>
    <PrivateRoute exact path='/users' component={Users}/>



    <div>
    <Link to="/signup">Signup</Link>
    <br />
    <Link to="/users">Users</Link>
    <br />
    <Link to="/companies">Companies</Link>
    </div>
  </div>
</Router>

</div>
)
