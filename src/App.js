import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
// import Footer from './components/Footer';


import Catalog from './views/Catalog';
import DollDetail from './views/DollDetail';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

class App extends Component {

  render() {
    // const { handleLogout } = this.props;
    
    return (
      <div className="main-container">
          {/* <button onClick={handleLogout}>logout</button> */}
          
              <Router>
                <Navbar></Navbar>
                <div className="content-wrap">
                  <AnonRoute exact path="/login" component={Login} />
                  <AnonRoute exact path="/signup" component={Signup} />
                  <AnonRoute exact path="/catalog" component={Catalog} />
                  <AnonRoute exact path="/catalog/:id" component={DollDetail} />
                  <PrivateRoute exact path="/private" component={PrivateView} />
                  
                </div>     
                      
                
              </Router>
            
      </div>
    );
  }
}

export default withAuth(App);
