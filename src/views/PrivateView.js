import React from 'react';
import {withAuth} from '../Context/AuthContext';

const PrivateView = ({ user }) => {
  return (
    <div>
      PrivateView
      user: {user.email}
    </div>
  );
};

export default withAuth(PrivateView);