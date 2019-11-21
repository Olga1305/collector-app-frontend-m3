import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withAuth } from '../../Context/AuthContext';
import LoginForm from './LoginForm';
import './Auth.css';

import SociaAuth from './SocialAuth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    emptyAlert: false,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.setState({
        emptyAlert: true,
      });
    } else {
      this.props.handleLogin({
        email,
        password,
      });
    }   
  };

  onConfirm = () => {
    this.setState({
      emptyAlert: false,
    });
  };

  render() {
    const { email, password, emptyAlert } = this.state;
    return (
      <>
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
            <LoginForm              
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </>
        )}

        {!emptyAlert && (
          <LoginForm
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

export default withAuth(Login);
