import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import withAuth from "../helpers/withAuth";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddCompanyDialog: false,
      newCompanyName: "",
      newCompanyAddress: "",
      newCompanyNip: "",
      newCompanyRegon: "",
      newCompanyPhoneNumber: "",
      newCompanyEmail: "",
      companies: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCompany = this.handleAddCompany.bind(this);
    this.handleOpenAddCompany = this.handleOpenAddCompany.bind(this);
    this.handleCloseAddCompany = this.handleCloseAddCompany.bind(this);
  }

  componentDidMount(res) {
    fetch("/companies")
      .then(res => res.json())
      .then(companies => this.setState({ companies }));
  }

  handleAddCompany(event) {
    event.preventDefault();
    fetch("/companies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newCompanyName,
        address: this.state.newCompanyAddress,
        nip: this.state.newCompanyNip,
        regon: this.state.newCompanyRegon,
        phoneNumber: this.state.newCompanyPhoneNumber,
        email: this.state.newCompanyEmail
      })
    })
      .then(res => res.json())
      .then(newCompany =>
        this.setState({
          companies: [...this.state.companies, newCompany]
        })
      )
      .finally(this.handleCloseAddCompany());
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOpenAddCompany() {
    this.setState({ openAddCompanyDialog: true });
  }

  handleCloseAddCompany() {
    this.setState({ openAddCompanyDialog: false });
  }

  render() {
    return (
      <div className="Companies">
        <Button onClick={this.handleOpenAddCompany}>Add company</Button>
        <Dialog
          open={this.state.openAddCompanyDialog}
          onClose={this.handleCloseAddCompany}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add company</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleAddCompany}>
              <TextField
                margin="dense"
                label="Company name"
                name="newCompanyName"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Company address"
                name="newCompanyAddress"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="NIP"
                name="newCompanyNip"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="REGON"
                name="newCompanyRegon"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Phone number"
                name="newCompanyPhoneNumber"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="newCompanyEmail"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddCompany} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddCompany} color="primary">
              Add company
            </Button>
          </DialogActions>
        </Dialog>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Address</TableCell>
                <TableCell numeric>NIP</TableCell>
                <TableCell numeric>REGON</TableCell>
                <TableCell numeric>Phone number</TableCell>
                <TableCell numeric>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.companies.map(company => {
                return (
                  <TableRow key={company.id}>
                    <TableCell numeric>{company.name}</TableCell>
                    <TableCell numeric>{company.address}</TableCell>
                    <TableCell numeric>{company.nip}</TableCell>
                    <TableCell numeric>{company.regon}</TableCell>
                    <TableCell numeric>{company.phoneNumber}</TableCell>
                    <TableCell numeric>{company.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withAuth(Companies);
