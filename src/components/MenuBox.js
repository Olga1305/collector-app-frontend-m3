import React from 'react';
import './MenuBox.css';

const MenuBox = props => {
    return (
        <div className="MenuBox">
            <div className="image">
                <img src={props.img} alt="subbrand"></img>
            </div>            
        </div>
    )
}

export default MenuBox; 