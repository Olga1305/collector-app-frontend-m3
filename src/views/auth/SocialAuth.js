import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import SocialButton from '../../components/SocialButton';


class SocialAuth extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logged: false,
      socialuser: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleSocialLogin (socialuser) {
    this.props.handleSocialLogin(socialuser);
  }

  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess (socialuser) {
    console.log(socialuser)

    this.setState({
      logged: true,
      currentProvider: socialuser._provider,
      socialuser
    })
  }

  onLoginFailure (err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      socialuser: {}
    })
  }

  onLogoutSuccess () {
    this.setState({
      logged: false,
      currentProvider: '',
      socialuser: {}
    })
  }

  onLogoutFailure (err) {
    console.error(err)
  }

  logout () {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render () {

    return (
        <SocialButton
          provider='google'
          appId='5529789427-digpt1lkvu1pb0qi4r7v1gl2opsqv8f9.apps.googleusercontent.com'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          onLogoutFailure={this.onLogoutFailure}
          getInstance={this.setNodeRef.bind(this, 'google')}
          key={'google'}
        >
          Sign in with Google
        </SocialButton>
    )
  }
}

export default withAuth(SocialAuth);