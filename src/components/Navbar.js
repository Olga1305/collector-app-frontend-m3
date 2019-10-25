import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo02.png';
import './Navbar.css';


class Navbar extends Component {

    state = {
        visibleMenu: false,
      }
    
      showMenu = () => {
            const { visibleMenu } = this.state;
            this.setState({
                visibleMenu: !visibleMenu,
            });
        }

    render() {
        const { visibleMenu } = this.state;

        return (            
            <>
                {!visibleMenu && 
                    <div>
                        <header id="#header">
                        <div id="menu_on" onClick={this.showMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="logo">
                                <Link to="/"><img src={logo} alt="logo"/></Link>                        
                            </div>
                        </header>                
                    </div>
                }
                {visibleMenu && 
                    <div className="visible_menu">
                        <header id="#header">
                        <div id="menu_on" onClick={this.showMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="logo">
                                <Link to="/" onClick={this.showMenu}><img src={logo} alt="logo"/></Link>                        
                            </div>
                        </header>                    
                        <nav>	
                            <ul>
                                <li><Link to="/login" onClick={this.showMenu}>Log in</Link></li>
                                <li><Link to="/signup" onClick={this.showMenu}>Sign up</Link></li>
                                <li><Link to="/catalog" onClick={this.showMenu}>Catalog</Link></li>                        
                            </ul>
                        </nav>                                   
                    </div>
                }              
              
            </>
            
        )
    }
}

export default Navbar;