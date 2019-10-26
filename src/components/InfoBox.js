import React from 'react';
import './InfoBox.css';

const InfoBox = props => {

        return (
            <div className="InfoBox">
                <div className="doll-image">
                    <img src={props.image} alt="doll"/>
                </div>
                <div className="doll-info">
                    <h2>{props.character} {props.name}</h2>
                    <h3>Mold: {props.mold}</h3>
                    <p><span>Release price: ${props.releasePrice}</span></p> 
                </div>   

            </div>
        )

}

export default InfoBox;