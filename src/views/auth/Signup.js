import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import logo from '../../assets/logo02.png';
import './Auth.css';

import SociaAuth from './SocialAuth';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.handleSignup({
      username,
      email,
      password,
    });
  };

  render() {
    const { username, email, password } = this.state;
    
    return (
      <div className="auth-body">
        <div className="auth-container">
          <form id="auth" onSubmit={this.handleFormSubmit}>
            <div className="header">
              <img className="auth-logo" src={logo} alt="logo" />
              <h1>Sign Up</h1>
              <p>Fill out this form to join</p>
            </div>
            <div className="sep"></div>
            <div className="inputs">
              <input
                type="text"
                placeholder="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={this.handleChange}
                autoFocus
              />
              <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="new-password"
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
            <SociaAuth/>
          </form>          
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
