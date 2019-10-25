import React from 'react';
import './MenuBox.css';

const MenuBox = props => {
    return (
        <div className="MenuBox">
            <div className="image">
                <img src={props.img} alt="beers"></img>
            </div>
            <div className="info">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>                
        </div>
    )
}

export default MenuBox; 