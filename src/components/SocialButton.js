import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SocialLogin from 'react-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

class SocialButton extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired,
    triggerLogout: PropTypes.func.isRequired,
    handleSocialLogin: PropTypes.func.isRequired,
  };

  render() {
    const { children, handleSocialLogin, triggerLogin, triggerLogout, ...props } = this.props;

    return (
      <GoogleLoginButton onClick={handleSocialLogin} {...props}>
        {children}
      </GoogleLoginButton>
    );
  }
}

export default SocialLogin(SocialButton);
