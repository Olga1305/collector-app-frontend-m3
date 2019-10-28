import React from 'react';
import './InfoBox.css';

import { Link } from "react-router-dom";

const InfoBox = props => {

        return (
            <div className="InfoBox">
                <div className="doll-image">
                    <Link to={`/catalog/${props.brand}/${props.id}`}>
                       <img src={props.image} alt="doll"/>
                    </Link>
                    
                </div>
                <div className="doll-info">
                    <h2>{props.name} - {props.character} - LE{props.editionSize}</h2>
                    <h3>Mold: {props.mold}</h3>
                    <h3>Skin tone: {props.skinTone}</h3> 
                    <h3>Release price: ${props.releasePrice}</h3> 
                    <button className="button-blue">+ to my collection</button>
                    <button className="button-blue">+ to my wishlist</button>
                </div>   

            </div>
        )

}

export default InfoBox;