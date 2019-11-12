// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Signup extends Component {

  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleSignup({
      email,
      password
    })
  }
  

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange}/><br/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} /><br/>
          <input className="button" type="submit" value="Signup" />
        </form>

        <p>Already have an account? 
          <Link className="button" to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);