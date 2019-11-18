// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import logo from '../../assets/logo02.png';
import './Auth.css';

class Signup extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleSignup({
      email,
      password,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="auth-container">
        <form id="auth" onSubmit={this.handleFormSubmit}>
          <div className="header">
            <img className="auth-logo" src={logo} alt="logo" />
            <h1>Sign Up</h1>
            <p>Fill out this form to join</p>
          </div>
          <div className="sep"></div>
          <div className="inputs">
            <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autoFocus />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <div className="checkboxy">
              <input name="cecky" id="checky" value="1" type="checkbox" />
              <label className="terms">I accept the terms of use</label>
            </div>
            <input id="submit" type="submit" value="Sign up" />
          </div>
          <p className="auth-link">
            Already have an account?{' '}
            <Link className="auth-link" to={'/login'}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
