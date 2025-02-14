import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo02.png';
import './Navbar.css';
import { withAuth } from '../Context/AuthContext';

import Searchbar from './Searchbar';

class Navbar extends Component {
  state = {
    visibleMenu: false,
  };

  showMenu = () => {
    const { visibleMenu } = this.state;
    this.setState({
      visibleMenu: !visibleMenu,
    });
  };

  render() {
    const { visibleMenu } = this.state;
    const { user, handleLogout } = this.props;

    return (
      <>
        {!visibleMenu && (
          <div>
            <header id="#header">
              <div id="menu_on" onClick={this.showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Searchbar />
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </header>
          </div>
        )}
        {visibleMenu && !user && (
          <div className="visible_menu">
            <header id="#header">
              <div id="menu_on" onClick={this.showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Searchbar />
              <div className="logo">
                <Link to="/" onClick={this.showMenu}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </header>
            <nav>
              <ul>
                <li id="home">
                  <Link to="/" onClick={this.showMenu}>
                    Home
                  </Link>
                </li>
                <li id="login">
                  <Link to="/login" onClick={this.showMenu}>
                    Log in
                  </Link>
                </li>
                <li id="signup">
                  <Link to="/signup" onClick={this.showMenu}>
                    Sign up
                  </Link>
                </li>
                <li id="catalog">
                  <Link to="/catalog" onClick={this.showMenu}>
                    Catalog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
        {visibleMenu && user && (
          <div className="visible_menu">
            <header id="#header">
              <div id="menu_on" onClick={this.showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Searchbar />
              <div className="logo">
                <Link to="/" onClick={this.showMenu}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </header>
            <nav>
              <ul>
                <li id="home">
                  <Link to="/" onClick={this.showMenu}>
                    Home
                  </Link>
                </li>
                <li id="profile">
                  <Link to="/profile" onClick={this.showMenu}>
                    Profile
                  </Link>
                </li>
                <li id="collection">
                  <Link to="/mycollection" onClick={this.showMenu}>
                    My collection
                  </Link>
                </li>
                <li id="wishlist">
                  <Link to="/mywishlist" onClick={this.showMenu}>
                    My wishlist
                  </Link>
                </li>
                <li id="catalog">
                  <Link to="/catalog" onClick={this.showMenu}>
                    Catalog
                  </Link>
                </li>
                <li id="logout">
                  <Link to="/" onClick={handleLogout}>
                    Log out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </>
    );
  }
}

export default withAuth(Navbar);
