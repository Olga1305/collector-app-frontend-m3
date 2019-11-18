import React, { Component } from 'react';
import { Spinner } from 'react-loading-io';
import { withAuth } from '../../Context/AuthContext';
import '../auth/Auth.css';

class UpdatePersonalData extends Component {
  state = {
    username: '',
    email: '',
    loading: true, 
  };

  async componentDidMount() {
    const { user: { username, email } } = this.props;
    try {
      this.setState({
        username,
        email,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, email } = this.state;
    this.props.handleProfileUpdate( {username, email} );
    this.props.history.push(`/personaldata`);
  };

  render() {
    const { username, email, loading } = this.state;
    return (
      <>
      {loading && <div><Spinner color={'#5898BE'} /></div>}
        {!loading && (
          <div className="auth-container">         
        
        <form id="auth" onSubmit={this.handleFormSubmit}>
        <h1>Update my personal data</h1>
        <div className="sep"></div>
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" autoComplete="username" placeholder={username} value={username} onChange={this.handleChange} />
          <br />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder={email} value={email} onChange={this.handleChange} />
          <br />
          <input id="submit" type="submit" value="submit" />
          </div>
        </form>
        </div>
         )}
      </>
    );
  }
}

export default withAuth(UpdatePersonalData);
