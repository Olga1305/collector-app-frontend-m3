// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

import './Profile.css';
import image from '../../assets/dc06.png';

class Profile extends Component {
  render() {
    const { handleLogout } = this.props;

    return (
      <div className="profile">
        <h1>My profile</h1>

        <div className="profile-btns">
          <Link className="button-profile" to="/mycollection">
            My collection
          </Link>
          <br />
          <Link className="button-profile" to="/mywishlist">
            My wishlist
          </Link>
          <br />
          <Link className="button-profile" to="/personaldata">
            Personal data
          </Link>
          <br />
          <Link className="button-profile logout" to="/" onClick={handleLogout}>
            Log out
          </Link>
          <br />
          <div className="profile-bgd-img">
            <img src={image} alt="dolls" />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
