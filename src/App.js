import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './views/Home';
import Catalog from './views/Catalog';
import DollsList from './views/DollsList';
import DollDetail from './views/DollDetail';
import SearchedResults from './views/SearchedResults';
import Profile from './views/user/Profile';
import PersonalData from './views/user/PersonalData';
import UpdatePersonalData from './views/user/UpdatePersonalData';
import MyCollection from './views/user/MyCollection';
import MyDollDetail from './views/user/MyDollDetail';
import UpdateMyDoll from './views/user/UpdateMyDoll';
import MyWishlist from './views/user/MyWishlist';
import WishlistDollDetail from './views/user/WishlistDollDetail';
import UpdateWishlistDoll from './views/user/UpdateWishlistDoll';

import Error404 from './views/Error404';

import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="main-container">
        <Router>
          <Navbar />
          <div className="content-wrap">
            <ErrorBoundary>
              <Switch>
                <AnonRoute exact path="/login" component={Login} />
                <AnonRoute exact path="/signup" component={Signup} />
                <Route exact path="/" component={Home} />
                <Route exact path="/catalog" component={Catalog} />
                <Route exact path="/catalog/:brand" component={DollsList} />
                <Route exact path="/catalog/:brand/:id" component={DollDetail} />
                <Route exact path="/searchresults" component={SearchedResults} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/personaldata" component={PersonalData} />
                <PrivateRoute exact path="/personaldata/update" component={UpdatePersonalData} />
                <PrivateRoute exact path="/mycollection" component={MyCollection} />
                <PrivateRoute exact path="/mycollection/:id" component={MyDollDetail} />
                <PrivateRoute exact path="/mycollection/:id/update" component={UpdateMyDoll} />
                <PrivateRoute exact path="/mywishlist" component={MyWishlist} />
                <PrivateRoute exact path="/mywishlist/:id" component={WishlistDollDetail} />
                <PrivateRoute exact path="/mywishlist/:id/update" component={UpdateWishlistDoll} />
                <Route path="*" component={Error404} />
              </Switch>
            </ErrorBoundary>
          </div>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default withAuth(App);
