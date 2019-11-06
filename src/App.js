import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
// import Footer from './components/Footer';

import Catalog from './views/Catalog';
import DollsList from './views/DollsList';
import DollDetail from './views/DollDetail';
import Profile from './views/user/Profile';
import Mycollection from './views/user/Mycollection';
import Mywishlist from './views/user/Mywishlist';

import Error404 from './views/Error404';
import Error500 from './views/Error500';

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
                <Navbar/>
                
                <div className="content-wrap">    
                <Switch>             
                  <AnonRoute exact path="/login" component={Login} />
                  <AnonRoute exact path="/signup" component={Signup} />
                  <Route exact path="/" component={Catalog} />
                  <Route exact path="/catalog" component={Catalog} />                 
                  <Route exact path="/catalog/:brand" component={DollsList} />                    
                  <Route exact path="/catalog/:brand/:id" component={DollDetail} />                
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute exact path="/mycollection" component={Mycollection} />
                  <PrivateRoute exact path="/mywishlist" component={Mywishlist} />
                  <Route path="*" component={Error404} />
                </Switch> 
                </div>     

      
                      
                
              </Router>
            
      </div>
    );
  }
}

export default withAuth(App);
