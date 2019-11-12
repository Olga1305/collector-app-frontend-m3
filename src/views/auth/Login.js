// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleLogin({
      email,
      password
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/><br/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} /><br/>
          <input className="button" type="submit" value="Login" />
        </form>
        <p>Don't have account? 
          <Link className="button" to={"/signup"}>Sign up</Link>
        </p>
      </div>
      
    )
  }
}

export default withAuth(Login);