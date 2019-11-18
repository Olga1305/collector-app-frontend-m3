// eslint-disable-next-line max-classes-per-file
import React, { Component, createContext } from 'react';
import { Spinner } from "react-loading-io";
import authService from '../services/authService';

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthConsumer>
          {({ isLoading, isLoggedin, user, handleSignup, handleLogin, handleLogout, handleProfileUpdate }) => (
            <Comp
              {...this.props}
              isLoading={isLoading}
              isLoggedin={isLoggedin}
              user={user}
              handleSignup={handleSignup}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleProfileUpdate={handleProfileUpdate}
            />
          )}
        </AuthConsumer>
      );
    }
  };
};

export default class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true,
  };

  componentDidMount() {
    authService
      .me()
      .then(user => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false,
        });
        console.log('me', user);
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  handleSignup = user => {
    authService
      .signup(user)
      .then(newUser => {
        this.setState({
          isLoggedin: true,
          user: newUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleLogin = user => {
    authService
      .login(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleLogout = () => {
    this.setState({
      isLoading: true,
    });
    authService
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        });
      });
  };

  handleProfileUpdate = user => {
    authService
      .updateMyPersonalData(user)
      .then(updatedUser => {
        this.setState({
          isLoggedin: true,
          user: updatedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { children } = this.props;
    if (isLoading) {
      return <div><Spinner color={'#5898BE'}/></div>;
    }
    return (
      <Provider
        value={{
          isLoading,
          isLoggedin,
          user,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleProfileUpdate: this.handleProfileUpdate,
        }}
      >
        {children}
      </Provider>
    );
  }
}
