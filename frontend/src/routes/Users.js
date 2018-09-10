import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCompany = this.handleAddCompany.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  componentDidMount(res) {
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState({ users }));
  }

  handleAddCompany(event) {
    event.preventDefault();

    fetch('/users', {
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
    }).then(res => res.json()).then(newCompany => this.setState({users:
       [...this.state.users,
         newCompany
      ]}));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClickOpen(event){
    const idUser = event.target.value;
    const selectedUser = this.state.users.find( user => {
      return user.id == idUser;
    });
    this.setState({
      selectedUserUsername: selectedUser.username,
      selectedUserPassword: selectedUser.password,
      selectedUserEmail: selectedUser.email,
    }, () =>  this.setState({open: true}));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="Users">
      USERS MANAGEMENT

      <table className="data-table">
        <tbody>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
          </tr>
          {this.state.users.map(user =>
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td><button value={user.id} onClick={this.handleClickOpen}>Edit</button></td>
            </tr>
          )}
         </tbody>
        </table>



<Dialog
  open={this.state.open}
  onClose={this.handleClose}
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
  <DialogContent>
    <form onSubmit={this.handleAddCompany}>
       <TextField margin="dense" label="Username" name="selectedUserUsername" type="text" value={this.state.selectedUserUsername} fullWidth onChange={this.handleInputChange}/>
       <TextField margin="dense" label="Password" name="selectedUserPassword" type="password" value={this.state.selectedUserPassword} fullWidth onChange={this.handleInputChange}/>
       <TextField margin="dense" label="Email" name="selectedUserPassword" type="text" value={this.state.selectedUserEmail} fullWidth onChange={this.handleInputChange}/>
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={this.handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={this.handleClose} color="primary">
      Subscribe
    </Button>
  </DialogActions>
</Dialog>
      </div>
    );
  }
}

export default Users;
