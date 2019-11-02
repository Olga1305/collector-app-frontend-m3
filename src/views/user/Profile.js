import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <div>
      <h1>My profile</h1>
      <Link className="button" to="/mycollection">
        My collection
      </Link>
      <br />
      <Link className="button" to="/mywishlist">
        My wishlist
      </Link>
      <br />
    </div>
  );
};

export default Profile;
