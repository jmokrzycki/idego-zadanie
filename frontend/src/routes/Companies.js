import React, { Component } from "react";
import axios from "axios";
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
import { connect } from "react-redux";
import { setCompanies, addCompany, updateForm } from "../actions/companies";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddCompanyDialog: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCompany = this.handleAddCompany.bind(this);
    this.handleOpenAddCompany = this.handleOpenAddCompany.bind(this);
    this.handleCloseAddCompany = this.handleCloseAddCompany.bind(this);
  }

  componentDidMount(res) {
    axios.get("/companies").then(res => {
      const companies = res.data;
      this.props.setCompanies(companies);
    });
  }

  handleAddCompany(event) {
    event.preventDefault();
    const company = {
      name: this.props.company.name,
      address: this.props.company.address,
      nip: this.props.company.nip,
      regon: this.props.company.regon,
      phoneNumber: this.props.company.phoneNumber,
      email: this.props.company.email
    };
    axios.post("/companies", company).then(newCompany => {
      this.props.addCompany(newCompany.data);
      this.handleCloseAddCompany();
    });
  }

  handleInputChange(event) {
    this.props.updateForm([event.target.name], event.target.value);
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
                name="name"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Company address"
                name="address"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="NIP"
                name="nip"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="REGON"
                name="regon"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Phone number"
                name="phoneNumber"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
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
              {this.props.companies.map(company => {
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

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    company: state.companies.company
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCompanies: companies => {
      dispatch(setCompanies(companies));
    },
    addCompany: company => {
      dispatch(addCompany(company));
    },
    updateForm: (key, value) => {
      dispatch(updateForm(key, value));
    }
  };
};

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Companies)
);
