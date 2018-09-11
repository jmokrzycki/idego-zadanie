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

//authorisation
import withAuth from "../helpers/withAuth";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditDialog: false,
      openAddDialog: false,
      selectedUserId: "",
      selectedUserUsername: "",
      selectedUserPassword: "",
      selectedUserEmail: "",
      newUserUsername: "",
      newUserPassword: "",
      newUserEmail: "",
      users: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleClickOpenAdd = this.handleClickOpenAdd.bind(this);
    this.handleClickOpenEdit = this.handleClickOpenEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount(res) {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  handleSignup(event) {
    event.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    });
  }

  handleAddUser(event) {
    event.preventDefault();

    console.log(this.state);

    fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.newUserUsername,
        password: this.state.newUserPassword,
        email: this.state.newUserEmail
      })
    })
      .then(res => res.json())
      .then(newUser =>
        this.setState({
          users: [...this.state.users, newUser]
        })
      )
      .then(this.handleCloseAddDialog());
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
      .then(this.handleCloseEditDialog());
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClickOpenAdd(event) {
    this.setState({ openAddDialog: true });
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
      () => this.setState({ openEditDialog: true })
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
      .then(this.handleCloseEditDialog());
  }

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  handleCloseAddDialog = () => {
    this.setState({ openAddDialog: false });
  };

  render() {
    return (
      <div className="Users">
        <Button onClick={this.handleClickOpenAdd}>Add user</Button>

        <Dialog
          open={this.state.openAddDialog}
          onClose={this.handleCloseAddDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                margin="dense"
                label="Username"
                name="newUserUsername"
                type="text"
                fullWidth
                value={this.state.newUserUsername}
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Password"
                name="newUserPassword"
                type="password"
                fullWidth
                value={this.state.newUserPassword}
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="newUserEmail"
                type="text"
                fullWidth
                value={this.state.newUserEmail}
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddUser} color="primary">
              ADD
            </Button>
          </DialogActions>
        </Dialog>

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
                      <button
                        value={user.id}
                        onClick={this.handleClickOpenEdit}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell numeric>
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
          open={this.state.openEditDialog}
          onClose={this.handleCloseEditDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
          <DialogContent>
            <form>
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
            <Button onClick={this.handleCloseEditDialog} color="primary">
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
