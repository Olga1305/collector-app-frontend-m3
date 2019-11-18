// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import logo from '../../assets/logo02.png';
import './Auth.css';

class Login extends Component {
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
    this.props.handleLogin({
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
            <h1>Log in</h1>
            <p>Log in to see your collection</p>
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

            <input id="submit" type="submit" value="Log in" />
          </div>
          <p className="auth-link">
            Don't have account?{' '}
            <Link className="auth-link" to={'/signup'}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
