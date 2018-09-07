import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Routes from './routes';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount(res) {

  }

  render() {
    return (
      <div className="App">

        <Routes />

      </div>
    );
  }
}

export default App;
