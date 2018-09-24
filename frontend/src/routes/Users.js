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
import { setUsers, addUser, selectUser, updateForm } from "../actions/users";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditUserDialog: false,
      openAddUserDialog: false,
      id: "",
      username: "",
      password: "",
      email: "",
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
      this.props.setUsers(users);
    });
  }

  handleAddUser(event) {
    event.preventDefault();
    const user = {
      username: this.props.user.username,
      password: this.props.user.password,
      email: this.props.user.email
    };
    axios.post("/users", user).then(newUser => {
      this.props.addUser(newUser.data);
      this.handleCloseAddUser();
    });
  }

  handleEditUser(event) {
    event.preventDefault();
    const user = {
      id: this.props.user.id,
      username: this.props.user.username,
      password: this.props.user.password,
      email: this.props.user.email
    };
    axios.patch("/users", user).then(() => {
      const newUsersArray = JSON.parse(JSON.stringify(this.props.users));
      newUsersArray.map(user => {
        if (user.id == this.props.user.id) {
          user.username = this.props.user.username;
          user.email = this.props.user.email;
        }
      });
      this.props.setUsers(newUsersArray);
      this.handleCloseEditUser();
    });
  }

  handleInputChange(event) {
    this.props.updateForm([event.target.name], event.target.value);
  }

  handleOpenAddUser() {
    this.setState({ openAddUserDialog: true });
  }

  handleOpenEditUser(event) {
    const idUser = event.target.value;
    const selectedUser = this.props.users.find(user => {
      return user.id == idUser;
    });
    this.props.selectUser({
      id: idUser,
      username: selectedUser.username,
      email: selectedUser.email
    });
    this.setState({ openEditUserDialog: true });
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
      const newUsersArray = JSON.parse(JSON.stringify(this.props.users));
      const deletedElementIndex = newUsersArray.findIndex(
        (element, index, array) => {
          return element.id == idUser;
        }
      );
      newUsersArray.splice(deletedElementIndex, 1);
      this.props.setUsers(newUsersArray);
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
                name="username"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Password"
                name="password"
                type="password"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
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
              {this.props.users.map(user => {
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
                name="username"
                type="text"
                fullWidth
                value={this.props.user.username}
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="New password (if needed, otherwise leave it blank)"
                name="password"
                type="password"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={this.props.user.email}
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

const mapStateToProps = state => {
  return {
    users: state.users.users,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: users => {
      dispatch(setUsers(users));
    },
    addUser: users => {
      dispatch(addUser(users));
    },
    selectUser: user => {
      dispatch(selectUser(user));
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
  )(Users)
);
