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
                    <Link to={`/catalog/${props.brand}/${props.id}`}>
                      <h4>{props.name} - {props.character} - LE{props.editionSize}</h4>
                    </Link>                    
                    <p>Mold: {props.mold}</p>
                    <p>Skin tone: {props.skinTone}</p> 
                    <p>Release price: ${props.releasePrice}</p> 
                    <button className="button" onClick={() => props.addToCollection(props.id)}>+ to my collection</button>
                    <button className="button" onClick={() => props.addToWishlist(props.id)}>+ to my wishlist</button>
                    
                    
                </div>   

            </div>
        )

}

export default InfoBox;