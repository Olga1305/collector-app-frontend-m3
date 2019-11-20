import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import logo from '../../assets/logo02.png';
import './Auth.css';

class SignupForm extends Component {
  
  render() {
    const { username, email, password, handleChange, handleFormSubmit, } = this.props;

    return (     
      <div className="auth-body">
        <div className="auth-container">
          <form id="auth" onSubmit={handleFormSubmit}>
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
                onChange={handleChange}
                autoFocus
              />
              <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
              />
              <div className="checkboxy">
                <input name="check" id="check" value="accept" type="checkbox" required />
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
      </div>
      
    );
  }
}

export default withAuth(SignupForm);
