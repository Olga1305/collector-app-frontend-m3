import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import LoginForm from './LoginForm';
import './Auth.css';

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


      // <div className="auth-body">
      //   <div className="auth-container">
      //     <form id="auth" onSubmit={this.handleFormSubmit}>
      //       <div className="header">
      //         <img className="auth-logo" src={logo} alt="logo" />
      //         <h1>Log in</h1>
      //         <p>Log in to see your collection</p>
      //       </div>
      //       <div className="sep"></div>
      //       <div className="inputs">
      //         <input
      //           type="email"
      //           placeholder="Email"
      //           name="email"
      //           value={email}
      //           onChange={this.handleChange}
      //           autoFocus
      //         />
      //         <input
      //           type="password"
      //           placeholder="Password"
      //           name="password"
      //           value={password}
      //           autoComplete="current-password"
      //           onChange={this.handleChange}
      //         />

      //         <input id="submit" type="submit" value="Log in" />
      //       </div>
      //       <p className="auth-link">
      //         Don't have account?{' '}
      //         <Link className="auth-link" to={'/signup'}>
      //           Sign up
      //         </Link>
      //       </p>
      //     </form>
      //   </div>
      // </div>
    );
  }
}

export default withAuth(Login);
