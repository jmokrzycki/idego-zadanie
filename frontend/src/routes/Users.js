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

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditUserDialog: false,
      openAddUserDialog: false,
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
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleOpenAddUser = this.handleOpenAddUser.bind(this);
    this.handleCloseAddUser = this.handleCloseAddUser.bind(this);
    this.handleOpenEditUser = this.handleOpenEditUser.bind(this);
    this.handleCloseEditUser = this.handleCloseEditUser.bind(this);
  }

  componentDidMount(res) {
    axios.get("/users").then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }

  handleAddUser(event) {
    event.preventDefault();
    const user = {
      username: this.state.newUserUsername,
      password: this.state.newUserPassword,
      email: this.state.newUserEmail
    };
    axios.post("/users", user).then(newUser => {
      this.setState({
        users: [...this.state.users, newUser.data]
      });
      this.handleCloseAddUser();
    });
  }

  handleEditUser(event) {
    event.preventDefault();
    const user = {
      id: this.state.selectedUserId,
      username: this.state.selectedUserUsername,
      password: this.state.selectedUserPassword,
      email: this.state.selectedUserEmail
    };
    axios.patch("/users", user).then(() => {
      const newUsersArray = JSON.parse(JSON.stringify(this.state.users));
      newUsersArray.map(user => {
        if (user.id == this.state.selectedUserId) {
          user.username = this.state.selectedUserUsername;
          user.email = this.state.selectedUserEmail;
        }
      });
      this.setState({ users: newUsersArray });
      this.handleCloseEditUser();
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOpenAddUser() {
    this.setState({ openAddUserDialog: true });
  }

  handleOpenEditUser(event) {
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
      () => this.setState({ openEditUserDialog: true })
    );
  }

  handleCloseEditUser() {
    this.setState({ openEditUserDialog: false });
  }

  handleCloseAddUser() {
    this.setState({ openAddUserDialog: false });
  }

  handleDeleteUser(event) {
    const idUser = event.target.value;
    const user = {
      id: idUser
    };
    axios.delete("/users", { data: user }).then(() => {
      const newUsersArray = JSON.parse(JSON.stringify(this.state.users));
      const deletedElementIndex = newUsersArray.findIndex(
        (element, index, array) => {
          return element.id == idUser;
        }
      );
      newUsersArray.splice(deletedElementIndex, 1);
      this.setState({ users: newUsersArray });
      this.handleCloseEditUser();
    });
  }

  render() {
    return (
      <div className="Users">
        <Button onClick={this.handleOpenAddUser}>Add user</Button>
        <Dialog
          open={this.state.openAddUserDialog}
          onClose={this.handleCloseAddUser}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add user</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                margin="dense"
                label="Username"
                name="newUserUsername"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Password"
                name="newUserPassword"
                type="password"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="newUserEmail"
                type="email"
                fullWidth
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddUser} color="primary">
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
                      <button value={user.id} onClick={this.handleOpenEditUser}>
                        Edit
                      </button>
                    </TableCell>
                    <TableCell numeric>
                      <button value={user.id} onClick={this.handleDeleteUser}>
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
          open={this.state.openEditUserDialog}
          onClose={this.handleCloseEditUser}
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
                fullWidth
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
                type="email"
                fullWidth
                value={this.state.selectedUserEmail}
                onChange={this.handleInputChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEditUser} color="primary">
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
