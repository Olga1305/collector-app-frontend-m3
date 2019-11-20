import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import logo from '../../assets/logo02.png';
import './Auth.css';

class LoginForm extends Component {
  render() {
    const { email, password, handleChange, handleFormSubmit } = this.props;

    return (
      <div className="auth-body">
        <div className="auth-container">
          <form id="auth" onSubmit={handleFormSubmit}>
            <div className="header">
              <img className="auth-logo" src={logo} alt="logo" />
              <h1>Log in</h1>
              <p>Log in to see your collection</p>
            </div>
            <div className="sep"></div>
            <div className="inputs">
              <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleChange}
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
      </div>
    );
  }
}

export default withAuth(LoginForm);
