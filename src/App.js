import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
// import Footer from './components/Footer';

import Catalog from './views/Catalog';
import DollsList from './views/DollsList';
import DollDetail from './views/DollDetail';
import Profile from './views/user/Profile';

import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';


class App extends Component {

  
  render() {
    const { handleLogout } = this.props;
    
    return (
      <div className="main-container">
          
          
              <Router>
                <Navbar/>
                
                <div className="content-wrap">
                  <Route exact path="/" component={Catalog} />
                  <AnonRoute exact path="/login" component={Login} />
                  <AnonRoute exact path="/signup" component={Signup} />
                  <Route exact path="/catalog" component={Catalog} />                 
                  <Route exact path="/catalog/:brand" component={DollsList} />                    
                  <Route exact path="/catalog/:brand/:id" component={DollDetail} />                
                  <PrivateRoute exact path="/profile" component={Profile} />  
                  <button className="logout" onClick={handleLogout}>logout</button>
                 
                </div>     
                      
                
              </Router>
            
      </div>
    );
  }
}

export default withAuth(App);
