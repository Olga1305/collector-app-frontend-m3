import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import SocialButton from '../../components/SocialButton';


class SocialAuth extends Component {
  constructor (props) {
    super(props)
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
  }

  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess (socialuser) {    
    this.props.handleSocialLogin(socialuser);
  }

  onLoginFailure (err) {
    console.error(err)
  }

  render () {

    return (
        <SocialButton
          provider='google'
          appId='5529789427-digpt1lkvu1pb0qi4r7v1gl2opsqv8f9.apps.googleusercontent.com'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          getInstance={this.setNodeRef.bind(this, 'google')}
          key={'google'}
        >
          Sign in with Google
        </SocialButton>
    )
  }
}

export default withAuth(SocialAuth);