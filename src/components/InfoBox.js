import React from 'react';
import './InfoBox.css';

import heart01 from '../assets/heart01.png';

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
                    <button className="button">+ to my collection</button>
                    <button className="button">+ to my wishlist</button>
                    {/* <div className="btns">
                        <div>
                             <button className="button">+ to my collection</button>
                        </div>                     
                        <div className="wislist-icon">
                            <img src={heart01} alt="wishlis icon"></img>
                        </div> 
                    </div> */}
                    
                </div>   

            </div>
        )

}

export default InfoBox;