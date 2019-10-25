import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';


class Footer extends Component {

    render() {        
        return (            
             
            <footer className="footer">
                <div class="about"><Link to="#">About</Link></div>
            </footer>        
            
        )
    }
}

export default Footer;