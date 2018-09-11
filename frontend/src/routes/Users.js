import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//authorisation
import withAuth from "../helpers/withAuth";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedUserId: "",
      selectedUserUsername: "",
      selectedUserPassword: "",
      selectedUserEmail: "",
      users: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount(res) {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  handleEditUser(event) {
    event.preventDefault();
    fetch("/users", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.selectedUserId,
        username: this.state.selectedUserUsername,
        password: this.state.selectedUserPassword,
        email: this.state.selectedUserEmail
      })
    })
      .then(res => res.json())
      .then(() => {
        const newArray = JSON.parse(JSON.stringify(this.state.users));
        newArray.map(user => {
          if (user.id == this.state.selectedUserId) {
            user.username = this.state.selectedUserUsername;
            user.email = this.state.selectedUserEmail;
          }
        });
        this.setState({ users: newArray });
      })
      .then(this.handleClose());
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClickOpenEdit(event) {
    const idUser = event.target.value;
    const selectedUser = this.state.users.find(user => {
      return user.id == idUser;
    });
    this.setState(
      {
        selectedUserId: idUser,
        selectedUserUsername: selectedUser.username,
        selectedUserEmail: selectedUser.email
      },
      () => this.setState({ open: true })
    );
  }

  handleClickDelete(event) {
    const idUser = event.target.value;
    fetch("/users", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: idUser
      })
    })
      .then(res => res.json())
      .then(() => {
        const newArray = JSON.parse(JSON.stringify(this.state.users));
        let deletedElementIndex = newArray.findIndex(
          (element, index, array) => {
            return element.id == idUser;
          }
        );
        newArray.splice(deletedElementIndex, 1);
        this.setState({ users: newArray });
      })
      .then(this.handleClose());
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="Users">
        USERS MANAGEMENT
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>Username</TableCell>
                <TableCell numeric>Email</TableCell>
                <TableCell numeric />
                <TableCell numeric />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map(user => {
                return (
                  <TableRow key={user.id}>
                    <TableCell numeric>{user.username}</TableCell>
                    <TableCell numeric>{user.email}</TableCell>
                    <TableCell numeric>
                      {" "}
                      <button
                        value={user.id}
                        onClick={this.handleClickOpenEdit}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell numeric>
                      {" "}
                      <button value={user.id} onClick={this.handleClickDelete}>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleAddCompany}>
              <TextField
                margin="dense"
                label="Username"
                name="selectedUserUsername"
                type="text"
                value={this.state.selectedUserUsername}
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="New password (if needed, otherwise leave it blank)"
                name="selectedUserPassword"
                type="password"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="selectedUserEmail"
                type="text"
                value={this.state.selectedUserEmail}
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEditUser} color="primary">
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withAuth(Users);
