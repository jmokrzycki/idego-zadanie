import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newCompanyName: "",
      newCompanyAddress: "",
      newCompanyNip: "",
      newCompanyRegon: "",
      newCompanyPhoneNumber: "",
      newCompanyEmail: "",
      companies: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCompany = this.handleAddCompany.bind(this);
  }

  componentDidMount(res) {
    fetch('/companies')
    .then(res => res.json())
    .then(companies => this.setState({ companies }));
  }

  handleAddCompany(event) {
    event.preventDefault();

this.setState({companies:
   [...this.state.companies,
  ]
});

    fetch('/companies', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": this.state.newCompanyName,
        "address": this.state.newCompanyAddress,
        "nip": this.state.newCompanyNip,
        "regon": this.state.newCompanyRegon,
        "phoneNumber": this.state.newCompanyPhoneNumber,
        "email": this.state.newCompanyEmail,
      })
    }).then(res => res.json()).then(newCompany => this.setState({companies:
       [...this.state.companies,
         newCompany
      ]}));
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
      <div className="App">

      <form onSubmit={this.handleAddCompany}>
              <label htmlFor="newCompanyName">Name</label>
              <input name="newCompanyName" type="text" onChange={this.handleInputChange}/>
              <br />
              <label htmlFor="newCompanyAddress">Address</label>
              <input name="newCompanyAddress" type="text" onChange={this.handleInputChange}/>
              <br />
              <label htmlFor="newCompanyNip">NIP</label>
              <input name="newCompanyNip" type="text" onChange={this.handleInputChange}/>
              <br />
              <label htmlFor="newCompanyRegon">REGON</label>
              <input name="newCompanyRegon" type="text" onChange={this.handleInputChange}/>
              <br />
              <label htmlFor="newCompanyPhoneNumber">Phone number</label>
              <input name="newCompanyPhoneNumber" type="text" onChange={this.handleInputChange}/>
              <br />
              <label htmlFor="newCompanyEmail">Email</label>
              <input name="newCompanyEmail" type="text" onChange={this.handleInputChange}/>
              <br />
              <button>Send data!</button>
            </form>

      <table className="data-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Adress</th>
            <th>NIP</th>
            <th>REGON</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
          {this.state.companies.map(company =>
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.nip}</td>
              <td>{company.regon}</td>
              <td>{company.phoneNumber}</td>
              <td>{company.email}</td>
            </tr>
          )}
         </tbody>
        </table>
      </div>
    );
  }
}

export default App;
