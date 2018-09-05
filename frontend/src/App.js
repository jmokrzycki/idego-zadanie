import React, { Component } from 'react';

class App extends Component {
  state = {users: []}

  componentDidMount(res) {
    fetch('/companies')
    .then(res => res.json())
    .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(company =>
          <div key={company.id}>{company.name} {company.address} {company.nip} {company.regon}
          {company.telephoneNumber} {company.email}</div>
        )}
      </div>
    );
  }
}

export default App;
