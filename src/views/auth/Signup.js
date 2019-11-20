import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withAuth } from '../../Context/AuthContext';
import SignupForm from './SignupForm';
import './Auth.css';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    emptyAlert: false,
    passwordAlert: false,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (username === '' || email === '' || password === '') {
      this.setState({
        emptyAlert: true,
      });
    }
    if (!this.checkPassword(password)) {
      this.setState({
        passwordAlert: true,
      });
    } else {
      this.props.handleSignup({
        username,
        email,
        password,
      });
    }
  };

  checkPassword = string => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (regex.test(string)) {
      return true;
    }
    return false;
  };

  onConfirm = () => {
    this.setState({
      emptyAlert: false,
      passwordAlert: false,
    });
  };

  render() {
    const { username, email, password, emptyAlert, passwordAlert } = this.state;
    return (
      <>
        {passwordAlert && (
          <>
            <SweetAlert
              warning
              confirmBtnBsStyle="warning"
              confirmBtnCssClass="alert-btn"
              title="Password alert"
              onConfirm={this.onConfirm}
            >
              The password should contain 6-20 characters, 1 numeric digit, 1 uppercase and 1 lowercase letter
            </SweetAlert>
          </>
        )}

        {emptyAlert && (
          <>
            <SweetAlert
              warning
              confirmBtnBsStyle="warning"
              confirmBtnCssClass="alert-btn"
              title="Empty fields"
              onConfirm={this.onConfirm}
            >
              The fields can't be empty!
            </SweetAlert>
            <SignupForm
              username={username}
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </>
        )}

        {!emptyAlert && (
          <SignupForm
            username={username}
            email={email}
            password={password}
            handleChange={this.handleChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        )}
      </>
    );
  }
}

export default withAuth(Signup);
