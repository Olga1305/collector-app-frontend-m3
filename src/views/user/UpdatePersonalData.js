import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import userService from '../../services/userService';

class UpdatePersonalData extends Component {
  state = {
    username: "",
    email: "",
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email } = this.state;
    const {
        history: { push },
      } = this.props;
    userService.updateMyPersonalData( username, email )
    .then(() => {
        push(`/personaldata`);
      })
      .catch(() => {});
  };

  render() {
    const { username, email } = this.state;
    return (
      <div>
        <h1>Update my personal data</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
          <br />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder={email} value={email} onChange={this.handleChange} />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(UpdatePersonalData);
